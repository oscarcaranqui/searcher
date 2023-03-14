//var DOMParser = require('dom-parser');

loadProducts = () => {
    let URLJson = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json";
    let URLXml = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";
    let templateProductoJson = "";
    let templateProductoXml = "";
    let filtro = document.getElementById("text").value;
    let hayFiltro = Boolean(filtro);
    document.getElementById("productos").innerHTML = "";

    let requestJson = async (miUrlJson) => {
      try {
        let responseJson = await fetch(miUrlJson);
        let resultJson = await responseJson.json();

        if (hayFiltro) {
          resultJson = resultJson.filter((el) => (el.name.includes(filtro.toLowerCase()) || el.type.includes(filtro.toLowerCase())));
        };

        resultJson.forEach(elemento => {
          let {name, price, src, type} = elemento;

          templateProductoJson += `
                  <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                    <div class="card card-blog card-plain">
                      <div class="card-header p-0 mt-n4 mx-3">
                        <a class="d-block shadow-xl border-radius-xl">
                          <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                        </a>
                      </div>
                      <div class="card-body p-3">
                        <p class="mb-0 text-sm">${type}</p>
                        <a href="javascript:;">
                          <h5>
                            ${name}
                          </h5>
                        </a>
                        <p class="mb-4 text-sm">
                          <b>Price: </b> $ ${price}
                        </p>
                      </div>
                    </div>
                  </div>`;
        });

        document.getElementById("productos").innerHTML += templateProductoJson;
      } catch (error) {
        console.log(error);
      };
    };

    let requestXml = async (miUrlXml) => {
      try {
        let responseXml = await fetch(miUrlXml);
        let resultXml = await responseXml.text();
        let xml = (new DOMParser()).parseFromString(resultXml, 'application/xml');
        let arrProducto = Array.from(xml.getElementsByTagName("product"));

        if (hayFiltro) {
          arrProducto = arrProducto.filter((el) => (el.getElementsByTagName("name")[0].innerHTML.includes(filtro.toLowerCase()) || el.getElementsByTagName("type")[0].innerHTML.includes(filtro.toLowerCase())));
        };

        arrProducto.forEach(elemento => {
          let name = elemento.getElementsByTagName("name")[0].innerHTML;
          let price = elemento.getElementsByTagName("price")[0].innerHTML;
          let src = elemento.getElementsByTagName("src")[0].innerHTML;
          let type = elemento.getElementsByTagName("type")[0].innerHTML;

          templateProductoXml += `
                  <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                    <div class="card card-blog card-plain">
                      <div class="card-header p-0 mt-n4 mx-3">
                        <a class="d-block shadow-xl border-radius-xl">
                          <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                        </a>
                      </div>
                      <div class="card-body p-3">
                        <p class="mb-0 text-sm">${type}</p>
                        <a href="javascript:;">
                          <h5>
                            ${name}
                          </h5>
                        </a>
                        <p class="mb-4 text-sm">
                          <b>Price: </b> $ ${price}
                        </p>
                      </div>
                    </div>
                  </div>`;
        });

        document.getElementById("productos").innerHTML += templateProductoXml;
      } catch (error) {
        console.log(error);
      };
    };
  
  requestJson(URLJson);
  requestXml(URLXml);
}

loadProducts();

let btnFilter = document.getElementById("filter");

btnFilter.addEventListener('click', (event) => {
  let hayFiltro = Boolean(document.getElementById("text").value);

  if (hayFiltro === false) {
    window.alert("No ha ingresado filtro");
  };
  
  loadProducts();
});
