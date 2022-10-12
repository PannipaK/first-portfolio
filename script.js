
//document.addEventListener("click", function(){
  //document.body.style.backgroundColor = "white";
//});
document.addEventListener("DOMContentLoaded", ready);

function ready(){
    // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}

filterSelection("all") // Execute the function and show all columns

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  //console.log(x);
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");//>-1 mean if it in there
  }
}

// Show filtered elements
function AddClass(element, name) {
  var i, arr1;
  arr1 = element.className.split(" ");
  if (arr1.indexOf(name) == -1) {
    element.className += " " + name;
    console.log('making element classname to', element.className);
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1;
  arr1 = element.className.split(" ");
  if (arr1.indexOf(name) > -1) {
    arr1.splice(arr1.indexOf(name), 1);
  }
  element.className = arr1.join(" ");
}



function init() {
  // create an instance of the contact manager
  abm = new AddressBookManager();
}

class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

function formSubmitted() {
  let name=document.getElementById("name").value;
  let email=document.getElementById("email").value;
  mycontact=new Contact(name, email);
  console.log(mycontact);
  abm.add(mycontact);
  abm.displayContactTable("contacts");
  return false;

}

function emptyList() {
  abm.empty();
}

class AddressBookManager {
  constructor() {
    this.listOfContacts = [];
  }
  empty() {
    this.listOfContacts.length=0;
    this.displayContactTable("contacts");
  }
  add(contact) {
    this.listOfContacts.push(contact);
  }

  displayContactTable(htmlId) {
    var table=document.createElement("table");

    if (table){
      table.remove();
    }
    var contacts = document.getElementById(htmlId);
    contacts.innerHTML="";
    if (this.listOfContacts.length==0){
      contacts.innerHTML="No contacts to display";
      return;
    }
    var tbl = document.createElement("table");

    //1.Set the id attribute of tbl to “table”
    tbl.setAttribute("id","table");

    //2. Get the element with id htmlId and append tbl to it as a child element
    contacts.appendChild(tbl);

    for (var index=0; index<this.listOfContacts.length; index++){
      var contact=this.listOfContacts[index];
      var row=tbl.insertRow(tbl.length);
      var cell_name=row.insertCell(0);
      var cell_email=row.insertCell(1);
      cell_name.innerHTML=contact.name;
      cell_email.innerHTML=contact.email;
    }
  }
}
