window.addEventListener('DOMContentLoaded', (event) => {
    const name =document.querySelector('#name');
    const textError =  document.querySelector('.text-error');
    name.addEventListener('input',function()
        {
            let nameRegex=RegExp('^[A-Z]{1}[a-z]{2,}$');
            if(nameRegex.test(name.value))
            {
                textError.textContent="";
            }
            else
            textError.textContent="Name is Invalid";
        });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent= salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
    const date = document.querySelector('#date');
    const error = document.querySelector('.date-error');
    date.addEventListener('input',function()
    {
        let date1 = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        try{
            let employee = new EmployeePayRollData();
            employee._startDate=new Date(date1);
            error.textContent="";
        }catch(e){
            error.textContent=e;
        }
    });
});




const save = () => 
{
    try{
        let employeePayRollData = createEmployeePayRoll();
        createAndUpdateStorage(employeePayRollData);
    }catch(e)
    {
       return;
    }
}

//local storage
function createAndUpdateStorage(employeePayrollData)
{
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList!=undefined)
  {
    employeePayrollList.push(employeePayrollData);
  }
  else{
    employeePayrollList=[employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayRoll = () =>{
    let employeePayRollData = new EmployeePayRollData();
    try{
        employeePayRollData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }

    employeePayRollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayRollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayRollData.department = getSelectedValues('[name=department]');
    employeePayRollData.salary = getSelectedValues('#salary');
    employeePayRollData.note = getSelectedValues('#note');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayRollData.date = Date.parse(date);
    alert(employeePayRollData.toString());
    return employeePayRollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems =  document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

// const getInputElementValue = (id) =>{
//     let value = document.getElementById(id).value;
//     return value;
// }
const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//reset button
const resetForm=() =>
{
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValuebyClassName('.text-error','');
  setValuebyClassName('.salary-output','400000');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','january')
  setValue('#year','2022');
  alert("The Form has been reseted");

}
const unsetSelectedValues=(propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}



 const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.textContent=value;
   }

   const setValuebyClassName=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
  }

