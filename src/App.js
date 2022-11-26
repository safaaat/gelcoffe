import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Menu, NotFound, Cart, Category, PersonalData, AddressBook, OrderList, UserAccount } from "./pages/Index";
import { Footer, RegisterAndLogin, ScrollToTop, Navbar } from "./components/Index";
import axios from "axios";
import { Api_Url } from "./utils/constants";
import PrivateRoutes from "./utils/PrivateRoutes";
import User from "./pages/User";

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      pelanggans: [],
      keranjangs: [],
      categorys: [],
      totalBarang: 0,
      showRegister: false,
      tipeForm: "",
      confimasiRegister: [],
      loginAkunPelanggan: [],
      loadingMenu: false,
      linkGetProducts: "products",
      valueAuth: false,
      offScrollBody: false,
      loading: false,
      heightCategory: 0,
      widthCategory: 0,
    }
  }

  async componentDidMount() {
    try {
      // Get Data Products
      await axios.get(`${Api_Url}${this.state.linkGetProducts}`)
        .then(res => {
          const products = res.data;
          this.setState({
            products,
          });
        })
      this.setState({ loadingMenu: true });
    } catch (err) {
      console.log(err)
    }
    // Function Get Data Pelanggan
    this.getPelanggan();
    // Function Get Category
    this.getCategorys();
  }

  // Showing And Remove Registrasi Form
  showFromRegister = (value, tipe) => {
    this.setState({
      showRegister: value,
      tipeForm: tipe,
    });
  }

  // Call Api's User
  getPelanggan = async () => {
    await axios.get(`${Api_Url}pelanggan`)
      .then(res => {
        const pelanggans = res.data;
        this.setState({ pelanggans });
      })
      .catch(error => {
        console.log(error);
      })
  }
  // Add Product Data To Existing Cart
  getKeranjang = async (data, akunlogin) => {
    if (data !== 0) {
      await axios.get(`${Api_Url}keranjangs?user_id=${akunlogin.id}`)
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(error => {
          console.log(error);
        })
    } else {
      this.setState({
        keranjangs: [],
      });
    }
  }
  // Function Get Category
  getCategorys = async () => {
    await axios.get(`${Api_Url}categories`).then((res) => {
      const categorys = res.data;
      this.setState({ categorys })
    })
  }

  postPelanggan = async (data) => {
    // On Loading
    this.setState({ loading: true })

    await axios({
      method: 'post',
      url: `${Api_Url}pelanggan`,
      data: {
        user_name: data.username,
        email: data.email,
        password: data.password
      }
    })
      .then(res => {
        const confimasiRegister = res.data
        this.setState({ confimasiRegister });
        this.getPelanggan();

        // Off Loading
        this.setState({ loading: false })
      }).catch(err => {
        console.log(err);
        // Off Loading
        this.setState({ loading: false })
      })
  }

  // Function Alert Proses Registrasi Sukses
  setAlertRegister = (value) => {
    this.setState({
      confimasiRegister: value,
    })
  }

  // Function Login Akun
  loginAkun = (value) => {
    if (value.length === 0) {
      this.setState({
        valueAuth: false,
        loginAkunPelanggan: value
      })
    }
    if (value.length !== 0) {
      this.setState({
        valueAuth: true,
        loginAkunPelanggan: value
      })
    }

    // Get Keranjangs, untuk memanggil Api's berdasarkan akun yang login
    this.getKeranjang(value.length, value[0]);
  }

  // Function Link Get Product
  linkProduct = async (value) => {
    this.setState({
      linkGetProducts: value,
      loadingMenu: false,
    })
    await axios.get(`${Api_Url}${value}`).then((res) => {
      const products = res.data;
      this.setState({
        products,
        loadingMenu: true,
      });
    })
  }

  // Function Cart Products, untuk menampung data
  addCart = (product) => {
    let akunlogin = this.state.loginAkunPelanggan

    if (akunlogin.length === 0) {
      this.showFromRegister(true, "login");
    } else {
      this.checkLoginAkun(akunlogin[0], product)
    }
  }

  // Check apakah loginAkunPelanggan ada di keranjang
  checkLoginAkun = async (akunlogin, product) => {
    // check keranjangs product mana yang sesuai dengan akunlogin
    await axios.get(`${Api_Url}keranjangs?user_id=${akunlogin.id}`).then((res) => {
      let cekproduct = false
      let dataKeranjangs = res.data
      // jika tidak ada produk di keranjangs akun kirim function postNewCart
      if (dataKeranjangs.length !== 0) {
        for (let i = 0; i < dataKeranjangs.length; i++) {
          // check apakah ada product yang sama di dalam keranjang
          if (dataKeranjangs[i].product_id === product.id) {
            // jika product sama, update jumlah productnya
            this.updateJumlahProduct(dataKeranjangs[i], product)
            cekproduct = true;
          }
        }
      }
      if (cekproduct === false || dataKeranjangs.length === 0) {
        this.postNewCart(akunlogin, product);
      }
    })
  }

  // Tambahkan data ke Cart
  postNewCart = async (akunlogin, product) => {
    const keranjangs = {
      product_id: product.id,
      user_id: akunlogin.id,
      kode: product.kode,
      jumlah: 1,
      nama: product.nama,
      harga: product.harga,
      gambar: product.gambar,
      category: product.category
    }

    await axios.post(`${Api_Url}keranjangs`, keranjangs).then((res) => {
      this.getKeranjang(this.state.loginAkunPelanggan.length, this.state.loginAkunPelanggan[0]);
    })
  }
  // update jumlah product yang ada di dalam keranjangs
  updateJumlahProduct = async (dataKeranjang, product) => {
    const keranjangs = {
      product_id: dataKeranjang.product_id,
      user_id: dataKeranjang.user_id,
      total_harga: dataKeranjang.harga + product.harga,
      kode: dataKeranjang.kode,
      jumlah: dataKeranjang.jumlah + 1,
      nama: dataKeranjang.nama,
      harga: dataKeranjang.harga,
      gambar: dataKeranjang.gambar,
      category: dataKeranjang.category
    }
    // get data, untuk update product yang mau di edit
    await axios.get(`${Api_Url}keranjangs?id=${dataKeranjang.id}`).then((res) => {
      // update product
      this.putJumlahProduct(res.data, keranjangs);
    })
  }
  // function Put keranjangs
  putJumlahProduct = async (data, keranjangs) => {
    // put Api's untuk update
    await axios.put(`${Api_Url}keranjangs/${data[0].id}`, keranjangs)
      .then((res) => {
        this.getKeranjang(this.state.loginAkunPelanggan.length, this.state.loginAkunPelanggan[0]);
      })
  }

  // Function Menghapus Product Di Dalam Keranjang
  clearProductBag = async (data) => {
    await axios.delete(`${Api_Url}keranjangs/${data.id}`).then((res) => {
      this.getKeranjang(this.state.loginAkunPelanggan.length, this.state.loginAkunPelanggan[0]);
    })
  }

  // Function On Off BackGround Scroll Body
  onOffScrollBody = (event) => {
    this.setState({
      offScrollBody: event,
    })
  }

  // Function Update Height Category
  updateHaightCategory = (height, width) => {
    this.setState({
      heightCategory: height,
      widthCategory: width,
    })
  }

  // Function Add And Min Total Product
  putAddMinProduct = async (value, id) => {
    await axios.put(`${Api_Url}keranjangs/${id}`, value)
      .then(() => {
        this.getKeranjang(this.state.loginAkunPelanggan.length, this.state.loginAkunPelanggan[0]);
      })
  }


  render() {
    return (
      <BrowserRouter>
        <div className={this.state.offScrollBody === true ? "relative overflow-hidden h-screen" : ""}>
          <ScrollToTop />

          <RegisterAndLogin
            showFromRegister={this.showFromRegister}
            showRegister={this.state.showRegister}
            confimasiRegister={this.state.confimasiRegister}
            setAlertRegister={this.setAlertRegister}
            tipeForm={this.state.tipeForm}
            postPelanggan={this.postPelanggan}

            checkInputUserName={this.state.checkInputUserName}
            closeClearInput={this.closeClearInput}

            // Login Akun
            loginAkun={this.loginAkun}
            // Loading
            loading={this.state.loading}
          />
          <div>
            <Routes>
              {/* NavBar */}
              <Route path="/"
                element={<Navbar
                  showFromRegister={this.showFromRegister}
                  loginAkunPelanggan={this.state.loginAkunPelanggan}
                  loginAkun={this.loginAkun}
                  keranjangs={this.state.keranjangs}
                  clearProductBag={this.clearProductBag}
                />}>

                {/* Page Home */}
                <Route index element={<Home linkProduct={this.linkProduct} />} />

                {/* Page Category */}
                <Route path="category" element={<Category categorys={this.state.categorys} linkProduct={this.linkProduct} onOffCategory={this.onOffCategory} showCategory={this.state.showCategory} heightCategory={this.state.heightCategory} widthCategory={this.state.widthCategory} />} >
                  {/* Menu */}
                  <Route index element={
                    <Menu
                      products={this.state.products}
                      loadingMenu={this.state.loadingMenu}
                      addCart={this.addCart}
                      updateHaightCategory={this.updateHaightCategory}
                    />
                  }
                  />
                </Route>

                <Route element={<PrivateRoutes valueAuth={this.state.valueAuth} />}>
                  {/* Account */}
                  <Route path="account" element={<UserAccount />}>
                    <Route index element={<PersonalData loginAkunPelanggan={this.state.loginAkunPelanggan} onOffScrollBody={this.onOffScrollBody} getPelanggan={this.getPelanggan} loginAkun={this.loginAkun} />} />
                    <Route path="addressbook" element={<AddressBook onOffScrollBody={this.onOffScrollBody} loginAkunPelanggan={this.state.loginAkunPelanggan} />} />
                    <Route path="orderlist" element={<OrderList />} />
                  </Route>
                </Route>

                {/* Cart */}
                <Route path="/cart" element={<Cart keranjangs={this.state.keranjangs} linkProduct={this.linkProduct} clearProductBag={this.clearProductBag} putAddMinProduct={this.putAddMinProduct} />} />

                {/* Notfound */}
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="user" element={<User />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter >
    )
  }
}