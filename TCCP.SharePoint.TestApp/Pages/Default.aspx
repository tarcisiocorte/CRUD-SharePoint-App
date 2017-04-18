<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    
    //TODO: what script should be placed
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
Doing some tests with SharePoint app or better....SharePoint-Add in
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderMain" runat="server">
   
<input type="button" value="New Item" id="Button1" onclick="ShowDialogNewItem()" />
<input type="button" value="Get All Items" id="btnAll" onclick="GetAllItems()" />

 <table id="addtable" class="gridtable"></table>
       
 <div id="newRecordPanel" style="display:none">
      <table>
    <tr><td><span id="itemId"></span></td></tr>
       <tr><td>Salutation</td><td>
           <select id="Select1">
               <option value="Mr">Mr</option>
               <option value="Mrs">Mrs</option>
               <option value="Ms">Ms</option>
           </select>

                         </td></tr>
           <tr>
   <td> Name</td><td><input type="text" id="txtFirstnameNewItem"  placeholder="First Name" size="20"/></td>
               </tr>
    <tr><td>Last Name</td><td><input type="text" size="20" id="txtLastNameNewItem"  placeholder="Last Name"/></td> </tr>
    <tr><td>Date of birth</td> <td><input type="text" id="txtDateOfBirthNewItem"  size="10"/></td></tr>
           <tr><td>Sex</td><td><input type="radio" name="sex" value="Male"/>Male</td></tr>
           <tr><td></td><td><input type="radio" name="sex" value="Female" checked="checked"/>Female</td></tr>
      
   
          <tr><td>Mobile</td><td><input placeholder="Mobile"  id="txtMobileNewItem" type="text" size="13"/></td></tr>
           <tr><td>Telephone</td><td><input placeholder="Telephone"  id="txtTelephoneNewItem" type="text" size="13"/></td></tr>
           <tr><td>Email</td><td><input id="txtEmailIDNewItem" type="email"/></td></tr>
          <tr><td>City</td>
              <td>   
                  <select id="listCities">
                      <option value="São Paulo">São Paulo</option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Curitiba">Curitiba</option>
                      <option value="Goiania">Goiania</option>
                  </select>
              </td>

          </tr>
          <tr><td><input type="button" id="btnEdit" value="Save" onclick="addListItem()" /></td></tr>
          </table>
                 
     </div>

 <div id="dialog" class="ui-dialog" style="display:none">

  
       <table>
    <tr><td><span id="itemEdit"></span></td></tr>
       <tr><td>Salutation</td><td>
           <select id="listEditSalutation">
               <option value="Mr" selected>Mr</option>
               <option value="Mrs">Mrs</option>
               <option value="Ms">Ms</option>
           </select>

                         </td></tr>
           <tr>
   <td> Name</td><td><input type="text" id="txtEditFirstName" required placeholder="First Name" size="20"/></td>
               </tr>
    <tr><td>Last Name</td><td><input type="text" size="20" id="txtEditLastName" required placeholder="Last Name"/></td> </tr>
    <tr><td>Date of birth</td> <td><input type="text" id="txtEditDOB" size="10"/></td></tr>
           <tr><td>Sex</td><td><input type="radio" name="sex" value="Male"/>Male</td></tr>
           <tr><td></td><td><input type="radio" name="sex" value="Female" checked="checked"/>Female</td></tr>
       
            </table>


  
     
      <table>
          <tr><td>Mobile</td><td><input placeholder="Mobile" id="txtEditMobile" type="text" size="13"/></td></tr>
           <tr><td>Telephone</td><td><input placeholder="Telephone" id="txtEditTele" type="text" size="13"/></td></tr>
           <tr><td>Email</td><td><input id="txtEditEmail" type="email" required="required"/></td></tr>
          <tr><td>City</td>
              <td>   
                  <select id="listEditCities">
                      <option value="São Paulo">São Paulo</option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Curitiba">Curitiba</option>
                      <option value="Goiania">Goiania</option>
                  </select>
              </td>

          </tr>
          <tr><td><input type="button" id="Button2" value="Update" onclick="ItemUpdate()" /></td></tr>
          </table>
        

     </div>
    <div id="deleteItemDiv" class="ui-dialog"  style="display:none">
        <p>Do you want to delete the item</p>
      
    </div>

     <div id="statusPane" class="ui-dialog" style="display:none">
        
      <p><img src="../Images/blue-tick.jpg">Record Addedd Successfuly</p>
    </div>
</asp:Content>

