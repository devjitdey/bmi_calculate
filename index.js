
// Requiring module
const express = require('express');
const bodyParser= require("body-parser")

// Creating express object
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let recordsList = [{"Gender": "Male", "HeightCm": 171, "WeightKg": 50 },{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, { "Gender": "Male", "HeightCm": 161, "WeightKg":
      85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female", "HeightCm": 166,
      "WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70}, {"Gender": "Female",
      "HeightCm": 167, "WeightKg": 82}]

app.get("/calculateBmi", function(req, res){
    try {
         let height;
         let height_m;
         let weight;
         let count_overweight = 0;

         recordsList.forEach(record=>{
            height = record["HeightCm"]
            height_m = record["HeightCm"]/100
            weight = record["WeightKg"]

            const bmi = weight / height_m

            record["BMI"]= bmi
            record["BMI_category"] = get_bmi_category(bmi);
            record["health_risk"] = get_health_risk(bmi)

            if(record["BMI_category"] == 'Overweight'){
               count_overweight += 1
            }
         })
         res.status(200).send({
            "records_list":recordsList,
            "count_overweight":count_overweight,
         })
    }catch(err){
      return {
			statusCode: 400,
			body: JSON.stringify({
				message: err,
			})
		};
    }
});

function get_bmi_category(bmi){
    if ( bmi <= 18.4)
       return "Underweight";
    else if ( bmi >= 18.5 && bmi <= 24.9)
       return "Normal weight";
    else if ( bmi >= 25 && bmi <= 29.9)
       return "Overweight";
    else if ( bmi >= 30 && bmi <= 34.9)
       return "Moderately obese";
    else if ( bmi >= 35 && bmi <= 39.9)
       return "Severely obese";
    else ( bmi >=40)
       return "Very severely obese";
}

function get_health_risk(bmi){
   if ( bmi <= 18.4)
      return "Malnutrition risk";
   else if ( bmi >= 18.5 && bmi <= 24.9)
      return "Low risk";
   else if ( bmi >= 25 && bmi <= 29.9)
      return "Enhanced risk"
   else if ( bmi >= 30 && bmi <= 34.9)
      return "Medium risk"
   else if ( bmi >= 35 && bmi <= 39.9)
      return "High risk"
   else ( bmi >=40)
      return "Very high risk"
}

 
// Port Number
const PORT = process.env.PORT || 5000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));