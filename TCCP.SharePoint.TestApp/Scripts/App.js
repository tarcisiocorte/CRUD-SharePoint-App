
"use strict"
var hostweburl;
var appwebUrl;
var context;
var site;
var list
var allItems;
var selectedCell;
var oListItem;


function ShowDialogNewItem() {

    $("#newRecordPanel").dialog();



}


$(document).ready(function () {

    $("#dob").datepicker();

    hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appwebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

    GetAllItems();


});



function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

function addListItem() {

    context = new SP.ClientContext(appwebUrl);
    site = context.get_web();
    list = site.get_lists().getByTitle("List");
    context.load(list);

    var firstName = $("#txtFirstNameNew").val();
    var lastName = $("#txtLastNameNew").val();
    var email = $("#txtEmailIDNew").val();
    var city = $("#listCities option:selected").text();

    var salutation = $("#Select1 option:selected").text();
    var sex = $('input[name="sex"]:checked').val();
    var tel = $("#txtTelephoneNew").val();
    var mobile = $("#txtMobileNew").val();

    var dateofbirth = $('#txtDateOfBirthNew').datepicker({ dateFormat: 'dd/mm/yy' }).val();


    var listItemCreationInfo = new SP.ListItemCreationInformation();
    var item = list.addItem(listItemCreationInfo);

    item.set_item("Title", salutation);

    item.set_item("FirstName1", firstName);
    item.set_item("LastName", lastName);

    item.set_item("Mobile", mobile);
    item.set_item("Email", email);
    item.set_item("Sex", sex);
    item.set_item("Telephone", tel);
    item.set_item("City", city);

    item.set_item("DateOfBirth", dateofbirth);

    item.update()

    context.executeQueryAsync(onItemAddedSuccess, onItemAddedFailure);

}

// This function is executed if the above call is successful


function onItemAddedSuccess() {

    $("#statusPane").dialog();


}

// This function is executed if the above call fails
function onItemAddedFailure(sender, args) {
    alert('Error:' + args.get_message());
}


function GetAllItems() {
    context = new SP.ClientContext(appwebUrl);
    site = context.get_web();
    list = site.get_lists().getByTitle("List");
    context.load(list);

    var query = SP.CamlQuery.createAllItemsQuery();
    allItems = list.getItems(query);
    context.load(allItems);
    context.executeQueryAsync(onItemRetrievalSuccess, onItemRetrievalFailure);



}






function onItemRetrievalSuccess() {
    console.log("Method called");
    var tableRow = "<table class='gridtable'><th>ID</th><th>Title</th><th>First Name</th><th>Last Name</th><th>Sex</th><th>Mobile</th><th>Email</th><th>Telephone</th><th>City</th>";


    var listItemEnumerator = allItems.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var item = listItemEnumerator.get_current();
        var fulldate = new Date(item.get_item('DateOfBirth'));
        var date = fulldate.getDate();
        var month = fulldate.getMonth() + 1;
        var year = fulldate.getFullYear();
        var dformat = date + "/" + month + "/" + year;

        tableRow = tableRow + '<tr>' +

        '<td>' + item.get_item('ID') + '</td>' +
        '<td>' + item.get_item('Title') + '</td>' +
         '<td>' + item.get_item('FirstName1') + '</td>' +
         '<td>' + item.get_item('LastName') + '</td>' +
           '<td>' + item.get_item('Sex') + '</td>' +
         '<td>' + item.get_item('Mobile') + '</td>' +
         '<td>' + item.get_item('Email') + '</td>' +

         '<td>' + item.get_item('Telephone') + '</td>' +
         '<td>' + item.get_item('City') + '</td>' +
         '<td>' + dformat + '</td>' +
         '<td class="paramUpdate"> <a id="lnkEdit">Edit</a></td>' +
          '<td><a id="lnkDelete">Delete</a></td>' +

        '</tr>';
    }
    tableRow += '</table>';

    $("#addtable").html(tableRow);
    $("#addtable").css({
        "border-color": "#C1E0FF",
        "border-width": "1px",
        "border-style": "solid"
    });



    $('#addtable td:nth-child(12)').bind('click', function () {
        var contactId = $(this).closest("tr").children().eq(0).html();
        $("#deleteItemDiv").dialog({
            modal: true, title: 'Delete Confirmation', width: 400, buttons: {
                "Ok":


                    function DeleteItem(itemId) {
                        itemId = contactId;
                        context = new SP.ClientContext(appwebUrl);
                        site = context.get_web();
                        list = site.get_lists().getByTitle("List");
                        context.load(list);

                        oListItem = list.getItemById(itemId);
                        oListItem.deleteObject();
                        list.update();
                        context.executeQueryAsync();
                    }


                , "Cancel": function () {

                    $(this).dialog("close");
                }
            }
        });

    });

    $('#addtable td:nth-child(11)').bind('click', function () {




        $("#dialog").dialog();

        //$("#editMode").hide();
        //$("#editMode").show("slow");  


        var contactId = $(this).closest("tr").children().eq(0).html();
        var title = $(this).closest("tr").children().eq(1).html();
        var fname1 = $(this).closest("tr").children().eq(2).html();
        var lname = $(this).closest("tr").children().eq(3).html();
        var checkedSex = $(this).closest("tr").children().eq(4).html();


        var mobile = $(this).closest("tr").children().eq(5).html();
        var email = $(this).closest("tr").children().eq(6).html();
        var telephone = $(this).closest("tr").children().eq(7).html();


        var theText = title;
        $("#listEditSalutation option:contains(" + theText + ")").attr('selected', 'selected');


        var sexRadio = $('input:radio[name=sex]');
        sexRadio.filter('[value=' + checkedSex + ']').attr('checked', true);

        $("#txtEditFirstName").val(fname1);
        $("#txtEditLastName").val(lname);


        $("#txtEditMobile").val(mobile);
        $("#txtEditTele").val(telephone);

        var theCity = $(this).closest("tr").children().eq(8).html();
        var dateOf = $(this).closest("tr").children().eq(9).html();
        $("#txtEditDOB").val(dateOf);

        $("#listEditCities option:contains(" + theCity + ")").attr('selected', 'selected');
        $("#txtEditEmail").val(email);
        $("#itemEdit").html(contactId);


    });
}



function onItemUpdateSuccess(sender, args) {
    alert("Successfully updated");
}

function onItemUpdateFailure(sender, args) {
    alert("Error on Updating:" + args.get_message());
}

function onItemRetrievalFailure(sender, args) {
    alert("Error on fetching:" + args.get_message());
}
function ItemUpdate() {
    context = new SP.ClientContext(appwebUrl);
    site = context.get_web();
    list = site.get_lists().getByTitle("List");
    context.load(list);
    var listItemCreationInfo = new SP.ListItemCreationInformation();
    var oListItem = list.getItemById(parseInt($("#itemEdit").html()));


    var salutation = $("#listEditSalutation option:selected").text();
    var sex = $('input[name="sex"]:checked').val();
    var city = $("#listEditCities option:selected").text();

    oListItem.set_item("Title", salutation);
    oListItem.set_item("FirstName1", $("#txtEditFirstName").val());
    oListItem.set_item("LastName", $("#txtEditLastName").val());

    oListItem.set_item("Mobile", $("#txtEditMobile").val());
    oListItem.set_item("Email", $("#txtEditEmail").val());
    oListItem.set_item("Sex", sex);
    oListItem.set_item("Telephone", $("#txtEditTele").val());
    oListItem.set_item("City", city);
    oListItem.set_item("DateOfBirth", $('#txtEditDOB').datepicker({ dateFormat: 'dd/mm/yy' }).val());

    // oListItem.set_item("DateOfBirth", $('#dob').datepicker({ dateFormat: 'dd/mm/yy' }).val());

    oListItem.update();
    context.executeQueryAsync(onItemUpdateSuccess, onItemUpdateFailure);

}