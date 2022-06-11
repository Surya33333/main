const isRequired = value => value === '' ? false : true;

const isMobileValid = (mobile) => {
    const re = new RegExp("(?=.{10,})");
    return re.test(mobile);
};

const isEmailvalid = (email) => {
     const re = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
     return re.test(email);
}

const isPincodeValid = (pincode) => {
    const re = new RegExp("(^([0-9]{6})$)");
    return re.test(pincode);
};
   
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


                                                                 //validating all forms here

function validateform(){

//hompage form details

    const usernameEl = document.querySelector('#username');
    const mobile1 = document.querySelector('#mobile');
    const from = document.querySelector('#from');
    const to = document.querySelector('#to');
    const form = document.querySelector('#createorder');


    const checkUsername = () => {
    
        let valid = false;
    
        const username = usernameEl.value.trim();
    
        if (!isRequired(username)) {
            showError(usernameEl, 'Username cannot be blank.');
        }else {
            showSuccess(usernameEl);
            valid = true;
        }
        return valid;
    };
 
    
    const checkMobile = () => {
        let valid = false;
        const mobileno = mobile1.value.trim();
        if (!isRequired(mobileno)) {
            showError(mobile1, 'Mobile cannot be blank.');
        }  else if (!isMobileValid(mobileno)) {
            showError(mobile1, 'Mobile should be 10 numbers');
        }else {
            showSuccess(mobile1);
            valid = true;
        }
        return valid;
    };
    
    
    const checkfrompincode = () => {
        let valid = false;
    
    
        const fromlocation = from.value.trim();
    
        if (!isRequired(fromlocation)|| !isPincodeValid(fromlocation)) {
            showError(from, 'Pincode should contain 6 numbers');
        } else if (!isdeliveryavailable(fromlocation)) {
            showError(from, 'Invalid Picode');
        } else{
            showSuccess(from);
            valid = true;
        }
    
        return valid;
    };
    
    
    const checktopincode = () => {
        let valid = false;
        const tolocation = to.value.trim();
    
        if (!isRequired(tolocation)|| !isPincodeValid(tolocation)) {
            showError(to, 'Pincode should contain 6 numbers');
        }  else if (!isdeliveryavailable(tolocation)) {
            showError(to, 'Invalid Picode');
        }  else {
            showSuccess(to);
            valid = true;
        }
    
        return valid;
    };
    
    
     const isdeliveryavailable = (pincode) => {
      const topincode = pincode; 
      let valid = false;
      var status = "Delivery";
        $.ajax({
                        url:`https://api.postalpincode.in/pincode/${topincode}`,
                        type:'GET',
                        datatype:'json',
                        success : function(response){
                            var data = response;
                            console.log(data);
                            for(var i=0; i<data.length; i++){
                              var office = data[i].PostOffice;
                              console.log(office);
                              var officestatus = office[i].DeliveryStatus;
                              console.log(officestatus);
                              var cities = office[i].District;
                              console.log(cities);
                            }
                        }
              })
              if(status == "Delivery"){
                valid = true;
              }else{
                valid = false;
              }
      return valid;
    };

    
    
    if(form){
    form.addEventListener('submit', function (e) {
        // prevent the form from submitting
        e.preventDefault();
    
        // validate fields
        let isUsernameValid = checkUsername(),
            isMobileValid = checkMobile(),
            isfrompincodevalid =  checkfrompincode(),
            istopincodevalid = checktopincode();
    
        let isFormValid = isUsernameValid &&
            isMobileValid && istopincodevalid && isfrompincodevalid;
    
        // submit to the server if the form is valid
        if (isFormValid) 
        {
    
          localStorage.clear();
    
          let details = {
            "name":"", 
            "mobile":"", 
            "from":"", 
            "to":""
          };
    
          details.name = document.getElementById("username").value;
          details.mobile = document.getElementById("mobile").value;
          details.from = document.getElementById("from").value;
          details.to = document.getElementById("to").value;
    
          console.log(details);
    
          localStorage.setItem('userdetails', JSON.stringify(details));
          console.log(JSON.stringify(details));
    
          window.location.href = "file:///C:/Users/spnre/OneDrive/Desktop/VMART/public_html/sendorder.html";
        }
      })
    }

//contact form details 

    const email = document.querySelector("#emailid");
    const message = document.querySelector("#message");
    const contactfrom = document.querySelector("#contactform");

    const checkemail = () => {
    
        let valid = false;
        const emailid = email.value.trim();
    
        if (!isRequired(emailid)) {
            showError(email, 'Email cannot be blank.');
        }else if (!isEmailvalid(emailid)) {
            showError(email, 'Invalid Email');
        }else {
            showSuccess(email);
            valid = true;
        }
        return valid;
    };


    if(contactfrom){
        contactfrom.addEventListener('submit', function(e){
            e.preventDefault();

            let isemailvalid = checkemail();
            let formvalid = isemailvalid;
            if(formvalid){
               $.ajax({
                    url : 'insert.php',
                    type : 'post',
                    data : {emailid: email.value, message: message.value},
                    success : function (result) {
                      var data = result;
                      console.log(data);
                    },
                    error: function(err){
                        console.log(err);
                    }
                })
            }
        })
    }
 
//search store form details

    const storepin = document.querySelector("#storepin");
    const storeform = document.querySelector("#findstore");

    const checkstorepincode = () => {
        let valid = false;
        const storepincode = storepin.value.trim();
    
        if (!isRequired(storepincode)|| !isPincodeValid(storepincode)) {
            showError(storepin, 'Pincode should contain 6 numbers');
        } else {
            showSuccess(storepin);
            valid = true;
        }
    
        return valid;
    };

    if(storeform){
        storeform.addEventListener('submit', function (e) {
            // prevent the form from submitting
            e.preventDefault();
        
            // validate fields
            let  isstorepincodevalid = checkstorepincode();
        
            let isFormValid = 
                isstorepincodevalid;
        
            // submit to the server if the form is valid
            if (isFormValid) {
                const storepincode = storepin.value.trim();
                $(document).ready(function(){

                $.ajax({
                  type: "GET",
                  url: `http://localhost:1000/${storepincode}`,
                  dataType: "json",
                  success : function(response){
                    var data = response;
                    console.log(data);
                    $("#storeslist").empty();

                    for(var i=0; i<data.length; i++){
                        
                    var phone = data[i].phone;
                    var city = data[i].city;
                    var state = data[i].state;
                    var location = data[i].location;
                    var storepincode = data[i].id;
                    console.log(phone,city,state,location,storepincode);
    
                    var storeslist = "<div class='card'><div class='card-head'>"+city+"</div><hr>"+
                                     "<div class='card-body'>"+phone+"<br>"+state+"<br>"+location+"<br>"+storepincode+"</div>"+
                                     "</div>";
                    
                    $("#storeslist").append(storeslist);
                    }
                
                }
            })
            })
            }
        })
    }


//Send order form details from local


//Send order form details

    const fromname = document.querySelector('#fromname');
    const frommobile = document.querySelector('#frommobile');
    const fromaddress = document.querySelector('#fromaddress');

    const weight = document.querySelector("#weight");
    const height = document.querySelector('#height');
    const width = document.querySelector('#width');
    const category = document.querySelector('#category');
    const vtype = document.querySelector('#vtype');
    const instructions = document.querySelector('#instruction');

    const toname = document.querySelector('#tousername');
    const tomobile = document.querySelector('#tomobile');
    const toaddress = document.querySelector('#toaddress');

    const orderform = document.querySelector("#orderform");

    let orderdetails = {
        "fromname" : "",
        "frommobile" : "",
        "frompincode" : "",
        "fromaddress" : "",
        "toname" : "",
        "tomobile" : "",
        "topincode" : "",
        "toaddress" : "",
        "weight" : "",
        "dimensinons" : "",
        "vtype" : "",
        "instructions" : "",
        "category" : ""
        }

    const checkweight = () => {
        let valid = false;
      
        const weight1 = weight.value.trim();
        if (!isRequired(weight1)) {
          showError(weight,'Package Weight');
        } else{
          showSuccess(weight);
          valid = true;
        } return valid;
      };
      
      const checkheight = () => {
        let valid = false;
      
        const height1 = height.value.trim();
        if (!isRequired(height1)) {
          showError(height,'Package height');
        } else{
          showSuccess(height);
          valid = true;
        } return valid;
      };
      
      
      // checking from form
      
      const checkfromname = () => {
      
      let valid = false;
      
      const username = fromname.value.trim();
      
      if (!isRequired(username)) {
          showError(fromname, 'Sender name please.');
      }else {
          showSuccess(fromname);
          valid = true;
      }
      return valid;
      };
      
      
      
      const checkfrommobile = () => {
          let valid = false;
          const mobileno = frommobile.value.trim();
          if (!isRequired(mobileno)) {
              showError(frommobile, 'Sender number please.');
          }  else if (!isMobileValid(mobileno)) {
              showError(frommobile, 'Mobile should be 10 numbers');
          }else {
              showSuccess(frommobile);
              valid = true;
          }
          return valid;
      };
      
      
      const checkfromaddress = () => {
        let valid = false;
        const address = fromaddress.value.trim();
        if(!isRequired(address)){
          showError(fromaddress,'Please fill the pickup address');
        } else{
          showSuccess(fromaddress);
          valid = true;
        }
        return valid;
      };
      
      
      //checking to form..
      
      const checktoname = () => {
      
      let valid = false;
      
      const username = toname.value.trim();
      
      if (!isRequired(username)) {
          showError(toname, 'Receiver name please.');
      }else {
          showSuccess(toname);
          valid = true;
      }
      return valid;
      };
      
      
      
      const checktomobile = () => {
          let valid = false;
          const mobileno = tomobile.value.trim();
          if (!isRequired(mobileno)) {
              showError(tomobile, 'Receivers number please.');
          }  else if (!isMobileValid(mobileno)) {
              showError(tomobile, 'Mobile should be 10 numbers');
          }else {
              showSuccess(tomobile);
              valid = true;
          }
          return valid;
      };
      
      
      const checktoaddress = () => {
        let valid = false;
        const address = toaddress.value.trim();
        if(!isRequired(address)){
          showError(toaddress,'Please fill the delivery address');
        } else{
          showSuccess(toaddress);
          valid = true;
        }
        return valid;
      };


      if(orderform){
        orderform.addEventListener('submit', function (e) {
            // prevent the form from submitting
            e.preventDefault();
        
        
            let isfromnamevalid = checkfromname(),
                isfrommobilevalid = checkfrommobile(),
                isfromaddressvalid = checkfromaddress (),
                istonamevalid = checktoname(),
                istomobilevalid = checktomobile(),
                istoaddressvalid = checktoaddress(),
                isheigthvalid = checkheight(),
                isweightvalid = checkweight();
        
        
            let isformvalid = isfromnamevalid && isfrommobilevalid && isfromaddressvalid && istonamevalid && istoaddressvalid && istomobilevalid && isweightvalid && isheigthvalid;
        
            if(isformvalid){
                
                orderdetails.fromname = fromname.value;
                orderdetails.frommobile = frommobile.value;
                orderdetails.fromaddress = fromaddress.value;
                orderdetails.frompincode = frompincode;
                orderdetails.toname = toname.value;
                orderdetails.tomobile = tomobile.value;
                orderdetails.toaddress = toaddress.value;
                orderdetails.topincode = topincode;
                orderdetails.width = width.value;
        
                console.log(orderdetails);
                localStorage.setItem('orderdetails',JSON.stringify(orderdetails));

                }
            })
          }

}
