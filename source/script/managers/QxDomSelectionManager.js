function QxDomSelectionManager(vBoundedWidget)
{
  QxSelectionManager.call(this, vBoundedWidget);
  
  this.setDragSelection(false);

  this._selectedItems.getItemHashCode = this.getItemHashCode;
};

QxDomSelectionManager.extend(QxSelectionManager, "QxDomSelectionManager");


proto.getItemEnabled = function(oItem) {
  return true;
};

proto.getItemClassName = function(vItem) {
  return vItem.className || "";
};

proto.setItemClassName = function(vItem, vClassName) {
  return vItem.className = vClassName;
};

proto.getItemBaseClassName = function(vItem) 
{
  var p = vItem.className.split(" ")[0];
  return p ? p : "Status";  
};

proto.getNextSibling = function(vItem) {
  return vItem.nextSibling;
};

proto.getPreviousSibling = function(vItem) {
  return vItem.previousSibling;
};

proto.getItemHashCode = function(vItem) {
  return vItem.toHash();
};

proto.getItemHashCode = function(oItem)
{
  if (oItem._hash) {
    return oItem._hash;
  };
  
  return oItem._hash = QxObject.toHash(oItem);  
};

proto.isBefore = function(vItem1, vItem2) 
{
  var pa = vItem1.parentNode;
  
  for (var i=0, l=pa.childNodes.length; i<l; i++)
  {
    switch(pa.childNodes[i])
    {
      case vItem2:
        return false;

      case vItem1:
        return true;
    };
  };
};

proto.scrollItemIntoView = function(vItem) {
  this.getBoundedWidget().scrollItemIntoView(vItem);
};

proto.getItems = function() {
  return this.getBoundedWidget().getItems();
};