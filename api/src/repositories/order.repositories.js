const { Op } = require("sequelize");
const { Order } = require("../models");

async function create(user_id, data, user) {

    try {
        const order = await Order.create(data);  
  await order.addCustomer(user_id);
  const orderAndUser = await Order.findByPk(order.purchaseId, {
    include: {
      association: "customer",
      attributes: { exclude: ["password"] },
    },
  });

  console.log("xxxx" + data.purchaseId)
  const receipt = await mercadopagoRepository.getPaymentById(
    data.purchaseId
  );

  console.log("kkkkkkkkkkkkk")
  await transporter.sendMail({
    from: '"Recibo de compra" <henrysBurger2022@gmail.com',
    to: user.email,
    subject: "Recibo de compra",
    html: `
    <!DOCTYPE html>
<html>
<head>
  <title>Henry's Burgers</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body,
    table,
    td,
    a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }

    /* RESET STYLES */
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    table {
      border-collapse: collapse !important;
    }
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* MEDIA QUERIES */
    @media screen and (max-width: 480px) {
      .mobile-hide {
        display: none !important;
      }
      .mobile-center {
        text-align: center !important;
      }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
  </style>
</head>
<body
  style="
    margin: 0 !important;
    padding: 0 !important;
    background-color: #eeeeee;
  "
  bgcolor="#eeeeee"
>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="background-color: #eeeeee" bgcolor="#eeeeee">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px"
        >
          <tr>
            <td
              align="center"
              valign="top"
              style="font-size: 0; padding: 35px"
              bgcolor="#0000000"
            >
              <div
                style="
                  display: inline-block;
                  max-width: 50%;
                  min-width: 100px;
                  vertical-align: top;
                  width: 100%;
                "
              >
                <table
                  align="left"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 300px"
                >
                  <tr>
                    <td align="left" valign="top" class="mobile-center">
                      <img
                        src="https://i.postimg.cc/Y0T86N5w/logo-henrys300px.png"
                        width="70"
                        height="70"
                        style="display: block; border: 0px"
                      />
                    </td>
                  </tr>
                </table>
              </div>

              <div
                style="
                  display: inline-block;
                  max-width: 50%;
                  min-width: 100px;
                  vertical-align: top;
                  width: 100%;
                "
              >
                <table
                  align="left"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 300px"
                >
                  <tr>
                    <td
                      align="right"
                      valign="top"
                      style="
                        font-family: Open Sans, Helvetica, Arial, sans-serif;
                        font-size: 48px;
                        font-weight: 400;
                        line-height: 48px;
                      "
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        align="right"
                      >
                        <tr>
                          <td
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              color: #ffbe33;
                              font-size: 14px;
                              font-weight: 100;
                              line-height: 24px;
                              text-transform: uppercase;
                            "
                          >
                            <h4>Comprobante de pago</h4>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="padding: 35px 35px 20px 35px; background-color: #ffffff"
              bgcolor="#ffffff"
            >
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      font-family: Open Sans, Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 24px;
                      padding-top: 25px;
                    "
                  >
                    <h2
                      style="
                        font-size: 20px;
                        font-weight: regular;
                        line-height: 25px;
                        color: #222831;
                        margin: 0;
                      "
                    >
                      ¡Gracias por tu compra!
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td
                    align="left"
                    style="
                      font-family: Open Sans, Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 24px;
                      padding-top: 10px;
                    "
                  >
                    <p
                      style="
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        color: #777777;
                        text-align: center;
                      "
                    >
                      ${user.lastName} ${user.name}, te
                      acercamos la factura con información de tu transacción.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding-top: 20px">
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      width="100%"
                    >
                      <tr>
                        <td
                          width="75%"
                          align="left"
                          bgcolor="#eeeeee"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            line-height: 24px;
                            padding: 10px;
                          "
                        >
                          Orden
                        </td>
                        <td
                          width="25%"
                          align="left"
                          bgcolor="#eeeeee"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            line-height: 24px;
                            padding: 10px;
                          "
                        >
                          #${data.purchaseId}
                        </td>
                      </tr>

                      <tr>
                      ${receipt.additional_info.items
                        .map(
                          (e) => `
                      <tr>
                        <td
                          width="75%"
                          align="left"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 24px;
                            padding: 15px 10px 5px 10px;
                          "
                        >
                        - ${e.quantity} ${e.title}
                        </td>
                        <td
                          width="25%"
                          align="left"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 24px;
                            padding: 15px 10px 5px 10px;
                          "
                        >
                          $ ${e.unit_price}
                        </td>
                      </tr>
                      `
                        )
                        .flat()
                        .join("")}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding-top: 20px">
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      width="100%"
                    >
                      <tr>
                        <td
                          width="75%"
                          align="left"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            line-height: 24px;
                            padding: 10px;
                            border-top: 3px solid #eeeeee;
                            border-bottom: 3px solid #eeeeee;
                          "
                        >
                          TOTAL
                        </td>
                        <td
                          width="25%"
                          align="left"
                          style="
                            font-family: Open Sans, Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            line-height: 24px;
                            padding: 10px;
                            border-top: 3px solid #eeeeee;
                            border-bottom: 3px solid #eeeeee;
                          "
                        >
                          $ ${receipt.transaction_amount}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              height="100%"
              valign="top"
              width="100%"
              style="padding: 0 35px 35px 35px; background-color: #ffffff"
              bgcolor="#ffffff"
            >
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 660px"
              >
                <tr>
                  <td align="center" valign="top" style="font-size: 0">
                    <div
                      style="
                        display: inline-block;
                        max-width: 50%;
                        min-width: 240px;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        align="left"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 300px"
                      >
                        <tr>
                          <td
                            align="left"
                            valign="top"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                            "
                          >
                            <h5>Domicilio</h5>
                            <p>
                              Company Inc. <br />
                              Gualeyguaychú 3895, <br />
                              C1419 CABA
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div
                      style="
                        display: inline-block;
                        max-width: 50%;
                        min-width: 240px;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        align="left"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 300px"
                      >
                        <tr>
                          <td
                            align="left"
                            valign="top"
                            style="
                              font-family: Open Sans, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                            "
                          >
                            <h5>Fecha y Hora:</h5>
                            <p>${new Date()}</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="padding: 35px; background-color: #222831"
              bgcolor="#1b9ba3"
            >
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      font-family: Open Sans, Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 24px;
                      padding-top: 25px;
                    "
                  >
                    <img
                      src="https://i.postimg.cc/Y0T86N5w/logo-henrys300px.png"
                      width="70"
                      height="70"
                      style="display: block; border: 0px"
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    style="
                      color: #eeeeee;
                      font-weight: 100;
                      font-style: italic;
                      font-size: 14px;
                    "
                  >
                    <h3>"Hamburguesas que se ajustan a tu estilo de vida"</h3>
                  </td>
                </tr>
                <tr style="text-align: center; border-radius: 15px">
                  <td
                    align="center"
                    style="
                      color: #ffffff;
                      text-align: center;
                      padding: 10px;
                      border: 1px solid #777777;
                      border-radius: 15px;
                    "
                  >
                    ¿Consultas?
                    <a style="color: #ffbe33" href="mailto:">
                      henrysburgers2022@gmail.com</a
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });

  console.log("kkkkkkkkkkkkk")

  return orderAndUser;
    } catch (error) {
        console.log(error);
    }
  
}

async function getAll(pag, limit) {
  const { count, rows } = await Order.findAndCountAll({
    include: {
      association: "customer",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: (pag - 1) * limit,
  });
  return {
    count,
    pages: Math.ceil(count / limit),
    pag,
    rows,
  };
}

async function getAllByUserId(user_id) {
  const orders = await Order.findAll({
    include: {
      association: "customer",
      attributes: { exclude: ["password"] },
      where: {
        id: { [Op.eq]: user_id },
      },
    },
    order: [["createdAt", "DESC"]],
  });
  return orders;
}

async function getByPurchaseId(purchaseId) {
  const order = await Order.findByPk(purchaseId, {
    include: {
      association: "customer",
      attributes: { exclude: ["password"] },
    },
  });
  return order;
}

async function changeStatus(id, status) {
  const order = await Order.findByPk(id);
  return await order.update({ status });
}

async function getById(id) {
  return await Order.findByPk(id);
}

module.exports = {
  create,
  getAll,
  changeStatus,
  getById,
  getAllByUserId,
  getByPurchaseId,
};
