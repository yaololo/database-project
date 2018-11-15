const dbSetup = require("../../DbConnection/setupConnection");

const yearlyMonthlySaleReport = async function(req, res) {
  try {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let reportType = req.body.reportType;
    console.log(startDate)
    console.log(endDate)
    var connection = dbSetup.connect();

    let sql = "SELECT  YEAR(o.order_date) AS `Year`," +
    "MONTHNAME(o.order_date) AS `Month`, " +
    "sum(od.quantity*p.unit_price) AS 'Sales Amount' ," +
    "count(*) as 'Number of Orders'" +
    "from orders o, orderdetail od, product p where  o.order_id=od.order_id and od.product_id=p.product_id" +
    " and  o.order_date >=? AND   o.order_date <=? " +
    "group by YEAR(o.order_date), MONTHNAME(o.order_date)" +
    "order by YEAR(o.order_date), MONTHNAME(o.order_date);";

    connection.query(sql, [startDate, endDate], function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: "Something went wrong while retrieving data."
          })
        );
      } else {

        console.log(results)
        let data = [];

        if(reportType === "Yearly"){
          data = yearlyReportMapper(results);
        } else if(reportType === "Monthly"){
          data = monthlyReportMapper(results);
          console.log(data)
        } else{
          data=customizeReportMapper(results);
        }

        return res.status(200).send(
          JSON.stringify({
            data: data
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

const yearlyReportMapper= (results) => {
  let map = {};
  let data = [];
  let amount = 0

  results.forEach(element => {
    if (map[element.Year] === undefined) {
      map[element.Year] = amount + Number(element["Sales Amount"])
    } else {
      map[element.Year] = amount + Number(element["Sales Amount"])
    }
  });
  for (let key in map) {
    let temp = {};
    temp.name = key;
    temp.sales = map[key];
    data.push(temp);
  }
  return data
}

const monthlyReportMapper= (results) => {
  let month= {
    January: 0 ,
     February: 0 ,
     Mar:0 ,
     April: 0 ,
     May: 0 ,
     June: 0 ,
     July: 0 ,
     August: 0 ,
     September: 0 ,
     October: 0 ,
     November: 0 ,
    December: 0
}
  let map = {};
  let data = [];

  results.forEach(element => {
    map[element.Month] = Number(element["Sales Amount"])
  });

  const mapped = Object.assign(month, map)
  for (let key in mapped) {
    let temp = {};
    if(key.length > 4){
      temp.name = key.substring(0, 3);
    }else {
      temp.name = key;
    }
    temp.sales = mapped[key];
    data.push(temp);

  }
  return data
}

const customizeReportMapper= (results) => {
  let map = {};
  let data = [];
  let count =0
  results.forEach(element => {
    count +=1;
    console.log(count)
    let tempName = '';
    if(element.Month.length > 4){
      tempName = element.Month.substring(0, 3);
    }else {
      tempName = element.Month;
    }

    if (map[tempName] === undefined) {
      map[tempName] = [];
      let temp = {};
      temp[element.Year] = Number(element["Sales Amount"])
      map[tempName].push(temp);

    } else {
      let temp = {};
      temp[element.Year] = Number(element["Sales Amount"])
      map[tempName].push(temp);
    }
  });
  console.log(map)

  for (let key in map) {
    let mapped = {}
    mapped.name = key;
    map[key].forEach(element => {
      mapped[Object.keys(element)] = Object.values(element)[0];
    })
    data.push(mapped);
  }
  console.log(data)
  return data
}

module.exports = yearlyMonthlySaleReport;
