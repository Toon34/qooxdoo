/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2006 by 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************

#module(menu)
#require(qx.manager.selection.RadioManager)

************************************************************************ */

qx.OO.defineClass("qx.ui.menu.MenuRadioButton", qx.ui.menu.MenuCheckBox,
function(vLabel, vCommand, vChecked)
{
  qx.ui.menu.MenuCheckBox.call(this, vLabel, vCommand, vChecked);

  qx.manager.object.ImagePreloaderManager.create("widget/menu/checkbox.gif");
});


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/

qx.OO.changeProperty({ name : "appearance", type : qx.constant.Type.STRING, defaultValue : "menu-radio-button" });

/*!
  The assigned qx.manager.selection.RadioManager which handles the switching between registered buttons
*/
qx.OO.addProperty({ name : "manager", type : qx.constant.Type.OBJECT, instance : "qx.manager.selection.RadioManager", allowNull : true });






/*
---------------------------------------------------------------------------
  MODIFIER
---------------------------------------------------------------------------
*/

qx.Proto._modifyChecked = function(propValue, propOldValue, propData)
{
  var vManager = this.getManager();

  if (vManager)
  {
    if (propValue)
    {
      vManager.setSelected(this);
    }
    else if (vManager.getSelected() == this)
    {
      vManager.setSelected(null);
    }
  }

  propValue ? this.addState(qx.ui.form.Button.STATE_CHECKED) : this.removeState(qx.ui.form.Button.STATE_CHECKED);
  this.getIconObject().setSource(propValue ? "widget/menu/radiobutton.gif" : "static/image/blank.gif");

  return true;
}

qx.Proto._modifyManager = function(propValue, propOldValue, propData)
{
  if (propOldValue) {
    propOldValue.remove(this);
  }

  if (propValue) {
    propValue.add(this);
  }

  return true;
}

qx.Proto._modifyName = function(propValue, propOldValue, propData)
{
  if (this.getManager()) {
    this.getManager().setName(propValue);
  }

  return true;
}





/*
---------------------------------------------------------------------------
  EXECUTE
---------------------------------------------------------------------------
*/

qx.Proto.execute = function()
{
  this.setChecked(true);

  // Intentionally bypass superclass and call super.super.execute
  qx.ui.menu.MenuButton.prototype.execute.call(this);
}
