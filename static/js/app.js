// from data.js
var tableData = data;

// YOUR CODE HERE!

var new_array = tableData;

//
//  function to display the array using /tbody, so first, the tags within tbody have to be removed
//

function printTable(new_array) {
    
    var tbody = d3.select("tbody");
    //var tbody_id = d3.select(tbody).attr("id","printTable")

    var tbody_info = tbody.html(); 
    

    if (tbody_info != ''){
        var all_tr = d3.select("tbody").selectAll("tr").remove();
        var all_td = d3.select("tbody").selectAll("td").remove();
    }

//
//loop thru the array to display on screen using tr and td within tbody
//
    
    new_array.forEach((incident) => {
        var row = tbody.append("tr");
        Object.entries(incident).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

    console.log('function - printTable is finished');
}


//
// filter :
// filter_field can be date, city, state, country or shape :
//
//

function filter_selection(filter_field) { 

// Select the filter
  var filter_field_0 = '#'+filter_field;
    
  var inputElement = d3.select(filter_field_0);

  // Get the value property of the input element
  var filter_value = inputElement.property("value");
  console.log(filter_field_0,filter_value);
    
  
  if (filter_value == '') {
     filter_value ='FALSE';
  } 
  console.log('function - filter_selection is finished', filter_value);

  return filter_value;
}


//    
// when filter values are entered and filter value key is pressed :
// filter the correct values from the array 
//


var submit = d3.select("#submit");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  console.log('function - submit starts');

  // filters processing
    
  scrn_selection = {};
  filter_fields =['datetime', 'city', 'state', 'country', 'shape'];
  
  filter_fields.forEach(item =>  {
    var filter_value = filter_selection(item);
    if (filter_value !== 'FALSE') {
          scrn_selection[item]= filter_value;
        }
  }); //filter_fields.forEach
    
  console.log('filter selection : ', scrn_selection);    
    
  var new_array = tableData;
  
//    
//  loop thru scrn_selection and filter the array according to the values in filter fields 
//    
//    
    
  filter_fields.forEach(item => {
 
      if (item in scrn_selection) {
         var filter_value = scrn_selection[item];
         var filter_item = item;
        
         console.log('filter_item', filter_item, filter_value);
         
         if (filter_value !== 'FALSE') {
             var temp_array = new_array.filter(function(incident) {
                  return incident[filter_item] === filter_value;
                });
             new_array = temp_array;
             printTable(new_array);  
             console.log('temp_array :',  temp_array);
         }   
      }
      
      
      
}); //filter_fields.forEach
  
  console.log('function - submit is finished');

});  //submit 




printTable(new_array);  


//
//  flashing diff colors on screen 
//
var color = ['#0431B4', '#B45F04', '#DBA901', '#5B4808','#FE9A2E', '#F5A9A9', '#F5A9BC', '#2E64FE', '#610B4B', 'EDBA901','#868A08', '#8000FF', '#29088A'];
color_change('div');
    
function color_change(element) {
    var random = Math.floor(Math.random()*color.length);
    d3.selectAll(element).style('background-color', color[random]);
    
    setInterval(() => {
        random = Math.floor(Math.random()*color.length);
        d3.selectAll(element).style('background-color', color[random]);},1000);

     }

    
console.log('last');
    
    
