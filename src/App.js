import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Menu,
  NotFound,
  Cart,
  Category,
  PersonalData,
  AddressBook,
  OrderList,
  UserAccount,
  CheckOut,
  Confirmasi,
  Completed,
  Cancel,
  OrderStatus,
  Search,
} from "./pages/Index";
import {
  Footer,
  RegisterAndLogin,
  ScrollToTop,
  Navbar,
} from "./components/Index";
import axios from "axios";
import { Api_Url } from "./utils/constants";
import PrivateRoutes from "./utils/PrivateRoutes";
import BlockUrl from "./utils/BlockUrl";
import PaymentDuration from "./utils/PaymentDuration";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      pelanggans: [],
      keranjangs: [],
      categorys: [],
      address: [],
      checkOut: [],
      paymentConfirmasi: [],
      canselPayment: [],
      totalBarang: 0,
      showRegister: false,
      tipeForm: "",
      confimasiRegister: [],
      loginAkunPelanggan: [],
      loadingMenu: false,
      linkGetProducts: "products",
      valueAuth: { user: false, checkOut: false },
      offScrollBody: false,
      loading: false,
      heightCategory: 0,
      widthCategory: 0,
      urlParams: "",
      offOnFooter: "on",
      onOffNavbar: "on",
      activeOrderStatus: { active: false, id: 0 },
      idConfirmasi: [],
    };
  }

  async componentDidMount() {
    try {
      // Get Data Products
      await axios.get(`${Api_Url}${this.state.linkGetProducts}`).then(res => {
        const products = res.data;
        this.setState({
          products,
        });
      });
      this.setState({ loadingMenu: true });
    } catch (err) {
      console.log(err);
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
  };

  // Call Api's User
  getPelanggan = async () => {
    await axios
      .get(`${Api_Url}pelanggan`)
      .then(res => {
        const pelanggans = res.data;
        this.setState({ pelanggans });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Add Product Data To Existing Cart
  getKeranjang = async (data, akunlogin) => {
    if (data !== 0) {
      // Get Keranjangs Berdasarkan Akun Yang Login
      await axios
        .get(`${Api_Url}keranjangs?user_id=${akunlogin.id}`)
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({
        keranjangs: [],
      });
    }
  };
  // Function Get Category
  getCategorys = async () => {
    await axios.get(`${Api_Url}categories`).then(res => {
      const categorys = res.data;
      this.setState({ categorys });
    });
  };

  postPelanggan = async data => {
    // On Loading
    this.setState({ loading: true });

    await axios({
      method: "post",
      url: `${Api_Url}pelanggan`,
      data: {
        user_name: data.username,
        email: data.email,
        password: data.password,
      },
    })
      .then(res => {
        const confimasiRegister = res.data;
        this.setState({ confimasiRegister });
        this.getPelanggan();

        // Off Loading
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
        // Off Loading
        this.setState({ loading: false });
      });
  };

  // Function Alert Proses Registrasi Sukses
  setAlertRegister = value => {
    this.setState({
      confimasiRegister: value,
    });
  };

  // Function Login Akun
  loginAkun = value => {
    if (value.length === 0) {
      this.setState({
        valueAuth: { user: false },
        loginAkunPelanggan: value,
      });
    }
    if (value.length !== 0) {
      this.setState({
        valueAuth: { user: true },
        loginAkunPelanggan: value,
      });
    }

    // Get Keranjangs, untuk memanggil Api's berdasarkan akun yang login
    this.getKeranjang(value.length, value[0]);
    // Get Address, Sesuai Dengan Login User
    this.getOnAddress(value[0].id);
    // Get Payment Confirmasi, Sesuai Dengan User Yang Sedang Login
    this.getPaymentConfirmation(value[0].id);
  };

  // Function Link Get Product
  linkProduct = async value => {
    this.setState({
      linkGetProducts: value,
      loadingMenu: false,
    });
    await axios.get(`${Api_Url}${value}`).then(res => {
      const products = res.data;
      this.setState({
        products,
        loadingMenu: true,
      });
    });
  };

  // Function Cart Products, untuk menampung data
  addCart = product => {
    let akunlogin = this.state.loginAkunPelanggan;

    if (akunlogin.length === 0) {
      this.showFromRegister(true, "login");
    } else {
      this.checkLoginAkun(akunlogin[0], product);
    }
  };

  // Check apakah loginAkunPelanggan ada di keranjang
  checkLoginAkun = async (akunlogin, product) => {
    // check keranjangs product mana yang sesuai dengan akunlogin
    await axios
      .get(`${Api_Url}keranjangs?user_id=${akunlogin.id}`)
      .then(res => {
        let cekproduct = false;
        let dataKeranjangs = res.data;
        // jika tidak ada produk di keranjangs akun kirim function postNewCart
        if (dataKeranjangs.length !== 0) {
          for (let i = 0; i < dataKeranjangs.length; i++) {
            // check apakah ada product yang sama di dalam keranjang
            if (dataKeranjangs[i].product_id === product.id) {
              // jika product sama, update jumlah productnya
              this.updateJumlahProduct(dataKeranjangs[i], product);
              cekproduct = true;
            }
          }
        }
        if (cekproduct === false || dataKeranjangs.length === 0) {
          this.postNewCart(akunlogin, product);
        }
      });
  };

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
      category: product.category,
    };

    await axios.post(`${Api_Url}keranjangs`, keranjangs).then(res => {
      this.getKeranjang(
        this.state.loginAkunPelanggan.length,
        this.state.loginAkunPelanggan[0]
      );
    });
  };
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
      category: dataKeranjang.category,
    };
    // get data, untuk update product yang mau di edit
    await axios.get(`${Api_Url}keranjangs?id=${dataKeranjang.id}`).then(res => {
      // update product
      this.putJumlahProduct(res.data, keranjangs);
    });
  };
  // function Put keranjangs
  putJumlahProduct = async (data, keranjangs) => {
    // put Api's untuk update
    await axios
      .put(`${Api_Url}keranjangs/${data[0].id}`, keranjangs)
      .then(res => {
        this.getKeranjang(
          this.state.loginAkunPelanggan.length,
          this.state.loginAkunPelanggan[0]
        );
      });
  };

  // Function Menghapus Product Di Dalam Keranjang
  clearProductBag = async data => {
    await axios.delete(`${Api_Url}keranjangs/${data.id}`).then(res => {
      this.getKeranjang(
        this.state.loginAkunPelanggan.length,
        this.state.loginAkunPelanggan[0]
      );
    });
  };

  // Function On Off BackGround Scroll Body
  onOffScrollBody = event => {
    console.log(event);
    this.setState({
      offScrollBody: event,
    });
  };

  // Function Update Height Category
  updateHaightCategory = (height, width) => {
    this.setState({
      heightCategory: height,
      widthCategory: width,
    });
  };

  // Function Add And Min Total Product
  putAddMinProduct = async (value, id) => {
    await axios.put(`${Api_Url}keranjangs/${id}`, value).then(() => {
      this.getKeranjang(
        this.state.loginAkunPelanggan.length,
        this.state.loginAkunPelanggan[0]
      );
    });
  };

  // Function Update State Address
  updateAddress = value => {
    this.setState({ address: value });
  };

  // Function Get Api Address
  getOnAddress = async idUser => {
    await axios.get(`${Api_Url}alamat?idUser=${idUser}`).then(ress => {
      this.setState({ address: ress.data });
    });
  };

  // Function Update Auth
  updateAuthPrevRout = value => {
    let data = { ...this.state.valueAuth, ...value };
    this.setState({ valueAuth: data });
  };

  // Function Update Data Product CheckOut
  updateCheckOut = value => {
    this.setState({ checkOut: value });
    this.setState({ OnOffFooter: "off" });
  };

  // Function Update Footer On Off
  OnOffFooter = value => {
    this.setState({ offOnFooter: value });
  };

  // Fucntion Update On Off Navbar
  updateOnOffNavbar = value => {
    this.setState({ onOffNavbar: value });
  };

  // Function get Api's Confirmasi
  getPaymentConfirmation = async userLogin => {
    await axios
      .get(`${Api_Url}confirmasi?idUser=${userLogin}`)
      .then(ress => {
        let data = ress.data;
        this.setState({
          paymentConfirmasi: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Function Post Api's Confirmasi.
  postPaymentConfirmation = async data => {
    await axios
      .post(`${Api_Url}confirmasi`, data)
      .then(res => {
        this.getPaymentConfirmation(this.state.loginAkunPelanggan[0].id);
        let data = res.data;

        let active = { active: true, id: data.id };
        this.setState({ activeOrderStatus: active });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Function Update Durasi Pembayaran
  putUpdatePaymentConfirmasi = async data => {
    await axios
      .put(`${Api_Url}confirmasi/${data.id}`, data)
      .then(() => {
        this.getPaymentConfirmation(this.state.loginAkunPelanggan[0].id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeStatusPayment = async (data, status) => {
    let newData = { ...data, ...status };
    delete newData.durasiPembayaran;

    await axios
      .put(`${Api_Url}/confirmasi/${data.id}`, newData)
      .then(() => {
        this.getPaymentConfirmation(this.state.loginAkunPelanggan[0].id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  offActiveOrderStatus = active => {
    this.setState({ activeOrderStatus: active });
  };

  updateIdConfirmasi = id => {
    this.setState({ idConfirmasi: id });
  };

  waitingConfirmation = (data, status) => {
    this.changeStatusPayment(data, status);

    setTimeout(() => {
      this.changeStatusPayment(data, { status: "completed" });
    }, 5000);
  };

  render() {
    return (
      <BrowserRouter>
        <div
          className={
            this.state.offScrollBody === true
              ? "relative overflow-hidden h-screen"
              : ""
          }
        >
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
              <Route
                path="/"
                element={
                  <Navbar
                    showFromRegister={this.showFromRegister}
                    loginAkunPelanggan={this.state.loginAkunPelanggan}
                    loginAkun={this.loginAkun}
                    keranjangs={this.state.keranjangs}
                    clearProductBag={this.clearProductBag}
                    dataAddress={this.state.address}
                    getOnAddress={this.getOnAddress}
                    onOffNavbar={this.state.onOffNavbar}
                    OnOffFooter={this.OnOffFooter}
                    onOffScrollBody={this.onOffScrollBody}
                  />
                }
              >
                {/* Page Home */}
                <Route
                  index
                  element={
                    <Home
                      linkProduct={this.linkProduct}
                      updateOnOffNavbar={this.updateOnOffNavbar}
                    />
                  }
                />
                {/* Page Category */}
                <Route
                  path="category"
                  element={
                    <Category
                      categorys={this.state.categorys}
                      linkProduct={this.linkProduct}
                      onOffCategory={this.onOffCategory}
                      showCategory={this.state.showCategory}
                      heightCategory={this.state.heightCategory}
                      widthCategory={this.state.widthCategory}
                      updateOnOffNavbar={this.updateOnOffNavbar}
                    />
                  }
                >
                  {/* Menu */}
                  <Route
                    index
                    element={
                      <Menu
                        products={this.state.products}
                        loadingMenu={this.state.loadingMenu}
                        addCart={this.addCart}
                        updateHaightCategory={this.updateHaightCategory}
                      />
                    }
                  />
                </Route>

                <Route
                  element={
                    <PrivateRoutes valueAuth={this.state.valueAuth.user} />
                  }
                >
                  {/* Account */}
                  <Route
                    path="account"
                    element={
                      <UserAccount updateOnOffNavbar={this.updateOnOffNavbar} />
                    }
                  >
                    <Route
                      index
                      element={
                        <PersonalData
                          loginAkunPelanggan={this.state.loginAkunPelanggan}
                          onOffScrollBody={this.onOffScrollBody}
                          getPelanggan={this.getPelanggan}
                          loginAkun={this.loginAkun}
                        />
                      }
                    />
                    <Route
                      path="addressbook"
                      element={
                        <AddressBook
                          onOffScrollBody={this.onOffScrollBody}
                          loginAkunPelanggan={this.state.loginAkunPelanggan}
                          updateAddress={this.updateAddress}
                        />
                      }
                    />

                    {/* Block URL orderlist, agar tidak dapat di akses */}
                    <Route
                      element={
                        <BlockUrl value={false} url={"orderlist/confirmasi"} />
                      }
                    >
                      <Route path="orderlist" element={<OrderList />} />
                    </Route>

                    <Route path="orderlist" element={<OrderList />}>
                      <Route
                        path="confirmasi"
                        element={
                          <Confirmasi
                            paymentConfirmasi={this.state.paymentConfirmasi}
                            updateIdConfirmasi={this.updateIdConfirmasi}
                          />
                        }
                      />
                      <Route
                        path="completed"
                        element={
                          <Completed
                            paymentConfirmasi={this.state.paymentConfirmasi}
                          />
                        }
                      />
                      <Route
                        path="cancel"
                        element={
                          <Cancel
                            paymentConfirmasi={this.state.paymentConfirmasi}
                          />
                        }
                      />
                    </Route>
                  </Route>
                </Route>
                {/* Cart */}
                <Route
                  path="cart"
                  element={
                    <Cart
                      keranjangs={this.state.keranjangs}
                      linkProduct={this.linkProduct}
                      clearProductBag={this.clearProductBag}
                      putAddMinProduct={this.putAddMinProduct}
                      checkoutOffNav={this.checkoutOffNav}
                      dataAddress={this.state.address}
                      loginAkunPelanggan={this.state.loginAkunPelanggan}
                      getOnAddress={this.getOnAddress}
                      updateAuthPrevRout={this.updateAuthPrevRout}
                      updateCheckOut={this.updateCheckOut}
                      onOffNavbar={this.state.onOffNavbar}
                      OnOffFooter={this.OnOffFooter}
                      updateOnOffNavbar={this.updateOnOffNavbar}
                    />
                  }
                />
                <Route
                  path="/search/:input"
                  element={
                    <Search
                      addCart={this.addCart}
                      updateHaightCategory={this.updateHaightCategory}
                    />
                  }
                />
                {/* Block Link Gel Coffe */}
                <Route element={<BlockUrl value={false} url={"/"} />}>
                  <Route path="gelcoffe" element={<NotFound />} />
                </Route>
                {/* Notfound */}
                <Route path="*" element={<NotFound bgGreen={true} />} />
              </Route>

              {/* CheckOut */}
              <Route
                element={
                  <PrivateRoutes valueAuth={this.state.valueAuth.checkOut} />
                }
              >
                <Route
                  path="checkout"
                  element={
                    <CheckOut
                      dataAddress={this.state.address}
                      productCheckOut={this.state.checkOut}
                      clearProductBag={this.clearProductBag}
                      updateCheckOut={this.updateCheckOut}
                      OnOffFooter={this.OnOffFooter}
                      loginAkunPelanggan={this.state.loginAkunPelanggan}
                      getOnAddress={this.getOnAddress}
                      postPaymentConfirmation={this.postPaymentConfirmation}
                      onOffScrollBody={this.onOffScrollBody}
                    />
                  }
                />
              </Route>

              {/* Order */}
              <Route
                path="/order/status/:id"
                element={
                  <OrderStatus
                    OnOffFooter={this.OnOffFooter}
                    paymentConfirmasi={this.state.paymentConfirmasi}
                    offActiveOrderStatus={this.offActiveOrderStatus}
                    updateIdConfirmasi={this.updateIdConfirmasi}
                  />
                }
              />
            </Routes>
          </div>

          <PaymentDuration
            putUpdatePaymentConfirmasi={this.putUpdatePaymentConfirmasi}
            paymentConfirmasi={this.state.paymentConfirmasi}
            changeStatusPayment={this.changeStatusPayment}
            idConfirmasi={this.state.idConfirmasi}
            waitingConfirmation={this.waitingConfirmation}
          />

          {this.state.offOnFooter === "on" ? <Footer /> : ""}

          {this.state.activeOrderStatus.active === true ? (
            <Navigate to={`/order/status/${this.state.activeOrderStatus.id}`} />
          ) : (
            ""
          )}
        </div>
      </BrowserRouter>
    );
  }
}
