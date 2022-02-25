(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],function(b){a(b,window,document)})}else{a(jQuery,window,document)}})(function(g,k,m,d){var j="intlTelInput",a=1,e={allowExtensions:false,autoFormat:true,autoPlaceholder:true,autoHideDialCode:true,defaultCountry:"",ipinfoToken:"",nationalMode:true,numberType:"MOBILE",onlyCountries:[],preferredCountries:["us","gb"],utilsScript:""},o={UP:38,DOWN:40,ENTER:13,ESC:27,PLUS:43,A:65,Z:90,ZERO:48,NINE:57,SPACE:32,BSPACE:8,DEL:46,CTRL:17,CMD1:91,CMD2:224},h=false;g(k).load(function(){h=true});function n(i,c){this.element=i;this.options=g.extend({},e,c);this._defaults=e;this.ns="."+j+a++;this.isGoodBrowser=Boolean(i.setSelectionRange);this.hadInitialPlaceholder=Boolean(g(i).attr("placeholder"));this._name=j;this.init()}n.prototype={init:function(){var i=this;if(this.options.defaultCountry=="auto"){this.options.defaultCountry="";var c="//ipinfo.io";if(this.options.ipinfoToken){c+="?token="+this.options.ipinfoToken}g.get(c,function(p){if(p&&p.country){i.options.defaultCountry=p.country.toLowerCase()}},"jsonp").always(function(){i._ready()})}else{this._ready()}},_ready:function(){if(this.options.nationalMode){this.options.autoHideDialCode=false}if(navigator.userAgent.match(/IEMobile/i)){this.options.autoFormat=false}this.isMobile=/Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);this._processCountryData();this._generateMarkup();this._setInitialState();this._initListeners()},_processCountryData:function(){this._setInstanceCountryData();this._setPreferredCountries()},_addCountryCode:function(i,c,q){if(!(c in this.countryCodes)){this.countryCodes[c]=[]}var p=q||0;this.countryCodes[c][p]=i},_setInstanceCountryData:function(){var q;if(this.options.onlyCountries.length){for(q=0;q<this.options.onlyCountries.length;q++){this.options.onlyCountries[q]=this.options.onlyCountries[q].toLowerCase()}this.countries=[];for(q=0;q<b.length;q++){if(g.inArray(b[q].iso2,this.options.onlyCountries)!=-1){this.countries.push(b[q])}}}else{this.countries=b}this.countryCodes={};for(q=0;q<this.countries.length;q++){var r=this.countries[q];this._addCountryCode(r.iso2,r.dialCode,r.priority);if(r.areaCodes){for(var p=0;p<r.areaCodes.length;p++){this._addCountryCode(r.iso2,r.dialCode+r.areaCodes[p])}}}},_setPreferredCountries:function(){this.preferredCountries=[];for(var q=0;q<this.options.preferredCountries.length;q++){var c=this.options.preferredCountries[q].toLowerCase(),p=this._getCountryData(c,false,true);if(p){this.preferredCountries.push(p)}}},_generateMarkup:function(){this.telInput=g(this.element);this.telInput.attr("autocomplete","off");this.telInput.wrap(g("<div>",{"class":"intl-tel-input"}));var i=g("<div>",{"class":"flag-dropdown"}).insertAfter(this.telInput);var c=g("<div>",{"class":"selected-flag"}).appendTo(i);this.selectedFlagInner=g("<div>",{"class":"iti-flag"}).appendTo(c);g("<div>",{"class":"arrow"}).appendTo(this.selectedFlagInner);if(this.isMobile){this.countryList=g("<select>").appendTo(i)}else{this.countryList=g("<ul>",{"class":"country-list v-hide"}).appendTo(i);if(this.preferredCountries.length&&!this.isMobile){this._appendListItems(this.preferredCountries,"preferred");g("<li>",{"class":"divider"}).appendTo(this.countryList)}}this._appendListItems(this.countries,"");if(!this.isMobile){this.dropdownHeight=this.countryList.outerHeight();this.countryList.removeClass("v-hide").addClass("hide");this.countryListItems=this.countryList.children(".country")}},_appendListItems:function(p,s){var r="";for(var q=0;q<p.length;q++){var t=p[q];if(this.isMobile){r+="<option data-dial-code='"+t.dialCode+"' value='"+t.iso2+"'>";r+=t.name+" +"+t.dialCode;r+="</option>"}else{r+="<li class='country "+s+"' data-dial-code='"+t.dialCode+"' data-country-code='"+t.iso2+"'>";r+="<div class='iti-flag "+t.iso2+"'></div>";r+="<span class='country-name'>"+t.name+"</span>";r+="<span class='dial-code'>+"+t.dialCode+"</span>";r+="</li>"}}this.countryList.append(r)},_setInitialState:function(){var c=this.telInput.val();if(this._getDialCode(c)){this._updateFlagFromNumber(c)}else{if(this.options.defaultCountry){this.options.defaultCountry=this._getCountryData(this.options.defaultCountry.toLowerCase(),false,false)}else{this.options.defaultCountry=this.preferredCountries.length?this.preferredCountries[0]:this.countries[0]}this._selectFlag(this.options.defaultCountry.iso2);if(!c){this._updateDialCode(this.options.defaultCountry.dialCode,false)}}if(c){this._updateVal(c,false)}},_initListeners:function(){var p=this;this._initKeyListeners();if(this.options.autoHideDialCode||this.options.autoFormat){this._initFocusListeners()}if(this.isMobile){this.countryList.on("change"+this.ns,function(q){p._selectListItem(g(this).find("option:selected"))})}else{var i=this.telInput.closest("label");if(i.length){i.on("click"+this.ns,function(q){if(p.countryList.hasClass("hide")){p.telInput.focus()}else{q.preventDefault()}})}var c=this.selectedFlagInner.parent();c.on("click"+this.ns,function(q){if(p.countryList.hasClass("hide")&&!p.telInput.prop("disabled")&&!p.telInput.prop("readonly")){p._showDropdown()}})}if(this.options.utilsScript){if(h){this.loadUtils()}else{g(k).load(function(){p.loadUtils()})}}},_initKeyListeners:function(){var c=this;if(this.options.autoFormat){this.telInput.on("keypress"+this.ns,function(t){if(t.which>=o.SPACE&&!t.ctrlKey&&!t.metaKey&&k.intlTelInputUtils&&!c.telInput.prop("readonly")){t.preventDefault();var r=t.which>=o.ZERO&&t.which<=o.NINE||t.which==o.PLUS,q=c.telInput[0],v=c.isGoodBrowser&&q.selectionStart==q.selectionEnd,i=c.telInput.attr("maxlength"),u=c.telInput.val(),s=i?u.length<i:true;if(s&&(r||v)){var p=r?String.fromCharCode(t.which):null;c._handleInputKey(p,true,r);if(u!=c.telInput.val()){c.telInput.trigger("input")}}if(!r){c._handleInvalidKey()}}})}this.telInput.on("keyup"+this.ns,function(s){if(s.which==o.ENTER||c.telInput.prop("readonly")){}else{if(c.options.autoFormat&&k.intlTelInputUtils){var r=s.which==o.CTRL||s.which==o.CMD1||s.which==o.CMD2,i=c.telInput[0],u=c.isGoodBrowser&&i.selectionStart==i.selectionEnd,q=c.isGoodBrowser&&i.selectionStart==c.telInput.val().length;if(!c.telInput.val()){c._updateFlagFromNumber("")}else{if(s.which==o.DEL&&!q||s.which==o.BSPACE||r&&u){c._handleInputKey(null,r&&q,r)}}if(!c.options.nationalMode){var t=c.telInput.val();if(t.charAt(0)!="+"){var p=c.isGoodBrowser?i.selectionStart+1:0;c.telInput.val("+"+t);if(c.isGoodBrowser){i.setSelectionRange(p,p)}}}}else{c._updateFlagFromNumber(c.telInput.val())}}})},_handleInvalidKey:function(){var c=this;this.telInput.trigger("invalidkey").addClass("iti-invalid-key");setTimeout(function(){c.telInput.removeClass("iti-invalid-key")},100)},_handleInputKey:function(v,s,t){var q=this.telInput.val(),r=this._getClean(q),i,u=this.telInput[0],p=0;if(this.isGoodBrowser){p=this._getDigitsOnRight(q,u.selectionEnd);if(v){q=q.substr(0,u.selectionStart)+v+q.substring(u.selectionEnd,q.length)}else{i=q.substr(u.selectionStart-2,2)}}else{if(v){q+=v}}this.setNumber(q,s,true,t);if(this.isGoodBrowser){var c;q=this.telInput.val();if(!p){c=q.length}else{c=this._getCursorFromDigitsOnRight(q,p);if(!v){c=this._getCursorFromLeftChar(q,c,i)}}u.setSelectionRange(c,c)}},_getCursorFromLeftChar:function(s,r,c){for(var p=r;p>0;p--){var q=s.charAt(p-1);if(g.isNumeric(q)||s.substr(p-2,2)==c){return p}}return 0},_getCursorFromDigitsOnRight:function(q,p){for(var c=q.length-1;c>=0;c--){if(g.isNumeric(q.charAt(c))){if(--p===0){return c}}}return 0},_getDigitsOnRight:function(r,q){var p=0;for(var c=q;c<r.length;c++){if(g.isNumeric(r.charAt(c))){p++}}return p},_initFocusListeners:function(){var c=this;if(this.options.autoHideDialCode){this.telInput.on("mousedown"+this.ns,function(i){if(!c.telInput.is(":focus")&&!c.telInput.val()){i.preventDefault();c.telInput.focus()}})}this.telInput.on("focus"+this.ns,function(p){var i=c.telInput.val();c.telInput.data("focusVal",i);if(c.options.autoHideDialCode&&!i&&!c.telInput.prop("readonly")&&c.selectedCountryData.dialCode){c._updateVal("+"+c.selectedCountryData.dialCode,true);c.telInput.one("keypress.plus"+c.ns,function(r){if(r.which==o.PLUS){var q=c.options.autoFormat&&k.intlTelInputUtils?"+":"";c.telInput.val(q)}});setTimeout(function(){var r=c.telInput[0];if(c.isGoodBrowser){var q=c.telInput.val().length;r.setSelectionRange(q,q)}})}});this.telInput.on("blur"+this.ns,function(){if(c.options.autoHideDialCode){var q=c.telInput.val(),p=q.charAt(0)=="+";if(p){var i=c._getNumeric(q);if(!i||c.selectedCountryData.dialCode==i){c.telInput.val("")}}c.telInput.off("keypress.plus"+c.ns)}if(c.options.autoFormat&&k.intlTelInputUtils&&c.telInput.val()!=c.telInput.data("focusVal")){c.telInput.trigger("change")}})},_getNumeric:function(c){return c.replace(/\D/g,"")},_getClean:function(c){var i=c.charAt(0)=="+"?"+":"";return i+this._getNumeric(c)},_showDropdown:function(){this._setDropdownPosition();var c=this.countryList.children(".active");if(c.length){this._highlightListItem(c)}this.countryList.removeClass("hide");if(c.length){this._scrollTo(c)}this._bindDropdownListeners();this.selectedFlagInner.children(".arrow").addClass("up")},_setDropdownPosition:function(){var c=this.telInput.offset().top,p=g(k).scrollTop(),i=c+this.telInput.outerHeight()+this.dropdownHeight<p+g(k).height(),q=c-this.dropdownHeight>p;var r=!i&&q?"-"+(this.dropdownHeight-1)+"px":"";this.countryList.css("top",r)},_bindDropdownListeners:function(){var p=this;this.countryList.on("mouseover"+this.ns,".country",function(r){p._highlightListItem(g(this))});this.countryList.on("click"+this.ns,".country",function(r){p._selectListItem(g(this))});var c=true;g("html").on("click"+this.ns,function(r){if(!c){p._closeDropdown()}c=false});var q="",i=null;g(m).on("keydown"+this.ns,function(r){r.preventDefault();if(r.which==o.UP||r.which==o.DOWN){p._handleUpDownKey(r.which)}else{if(r.which==o.ENTER){p._handleEnterKey()}else{if(r.which==o.ESC){p._closeDropdown()}else{if(r.which>=o.A&&r.which<=o.Z||r.which==o.SPACE){if(i){clearTimeout(i)}q+=String.fromCharCode(r.which);p._searchForCountry(q);i=setTimeout(function(){q=""},1000)}}}}})},_handleUpDownKey:function(c){var p=this.countryList.children(".highlight").first();var i=c==o.UP?p.prev():p.next();if(i.length){if(i.hasClass("divider")){i=c==o.UP?i.prev():i.next()}this._highlightListItem(i);this._scrollTo(i)}},_handleEnterKey:function(){var c=this.countryList.children(".highlight").first();if(c.length){this._selectListItem(c)}},_searchForCountry:function(q){for(var c=0;c<this.countries.length;c++){if(this._startsWith(this.countries[c].name,q)){var p=this.countryList.children("[data-country-code="+this.countries[c].iso2+"]").not(".preferred");this._highlightListItem(p);this._scrollTo(p,true);break}}},_startsWith:function(i,c){return i.substr(0,c.length).toUpperCase()==c},_updateVal:function(r,s,p,i){var q;if(this.options.autoFormat&&k.intlTelInputUtils){if(!p&&this.options.nationalMode&&r.charAt(0)=="+"&&intlTelInputUtils.isValidNumber(r,this.selectedCountryData.iso2)){q=intlTelInputUtils.formatNumberByType(r,this.selectedCountryData.iso2,intlTelInputUtils.numberFormat.NATIONAL)}else{q=intlTelInputUtils.formatNumber(r,this.selectedCountryData.iso2,s,this.options.allowExtensions,i)}var c=this.telInput.attr("maxlength");if(c&&q.length>c){q=q.substr(0,c)}}else{q=r}this.telInput.val(q)},_updateFlagFromNumber:function(r){if(r&&this.options.nationalMode&&this.selectedCountryData&&this.selectedCountryData.dialCode=="1"&&r.charAt(0)!="+"){if(r.charAt(0)!="1"){r="1"+r}r="+"+r}var i=this._getDialCode(r),p=null;if(i){var s=this.countryCodes[this._getNumeric(i)],c=this.selectedCountryData&&g.inArray(this.selectedCountryData.iso2,s)!=-1;if(!c||this._isUnknownNanp(r,i)){for(var q=0;q<s.length;q++){if(s[q]){p=s[q];break}}}}else{if(r.charAt(0)=="+"&&this._getNumeric(r).length){p=""}else{if(!r||r=="+"){p=this.options.defaultCountry.iso2}}}if(p!==null){this._selectFlag(p)}},_isUnknownNanp:function(i,c){return c=="+1"&&this._getNumeric(i).length>=4},_highlightListItem:function(c){this.countryListItems.removeClass("highlight");c.addClass("highlight")},_getCountryData:function(c,r,s){var p=r?b:this.countries;for(var q=0;q<p.length;q++){if(p[q].iso2==c){return p[q]}}if(s){return null}else{throw new Error("No country data for '"+c+"'")}},_selectFlag:function(c,i){this.selectedCountryData=c?this._getCountryData(c,false,false):{};if(i&&this.selectedCountryData.iso2){this.options.defaultCountry={iso2:this.selectedCountryData.iso2}}this.selectedFlagInner.attr("class","iti-flag "+c);var p=c?this.selectedCountryData.name+": +"+this.selectedCountryData.dialCode:"Unknown";this.selectedFlagInner.parent().attr("title",p);this._updatePlaceholder();if(this.isMobile){this.countryList.val(c)}else{this.countryListItems.removeClass("active");if(c){this.countryListItems.children(".iti-flag."+c).first().parent().addClass("active")}}},_updatePlaceholder:function(){if(k.intlTelInputUtils&&!this.hadInitialPlaceholder&&this.options.autoPlaceholder){var c=this.selectedCountryData.iso2,i=intlTelInputUtils.numberType[this.options.numberType||"FIXED_LINE"],p=c?intlTelInputUtils.getExampleNumber(c,this.options.nationalMode,i):"";this.telInput.attr("placeholder",p)}},_selectListItem:function(c){var i=this.isMobile?"value":"data-country-code";this._selectFlag(c.attr(i),true);if(!this.isMobile){this._closeDropdown()}this._updateDialCode(c.attr("data-dial-code"),true);this.telInput.trigger("change");this.telInput.focus()},_closeDropdown:function(){this.countryList.addClass("hide");this.selectedFlagInner.children(".arrow").removeClass("up");g(m).off(this.ns);g("html").off(this.ns);this.countryList.off(this.ns)},_scrollTo:function(t,y){var c=this.countryList,x=c.height(),r=c.offset().top,w=r+x,u=t.outerHeight(),q=t.offset().top,v=q+u,i=q-r+c.scrollTop(),p=x/2-u/2;if(q<r){if(y){i-=p}c.scrollTop(i)}else{if(v>w){if(y){i+=p}var s=x-u;c.scrollTop(i-s)}}},_updateDialCode:function(q,c){var p=this.telInput.val(),r;q="+"+q;if(this.options.nationalMode&&p.charAt(0)!="+"){r=p}else{if(p){var s=this._getDialCode(p);if(s.length>1){r=p.replace(s,q)}else{var i=p.charAt(0)!="+"?g.trim(p):"";r=q+i}}else{r=!this.options.autoHideDialCode||c?q:""}}this._updateVal(r,c)},_getDialCode:function(r){var p="";if(r.charAt(0)=="+"){var s="";for(var q=0;q<r.length;q++){var t=r.charAt(q);if(g.isNumeric(t)){s+=t;if(this.countryCodes[s]){p=r.substr(0,q+1)}if(s.length==4){break}}}}return p},destroy:function(){if(!this.isMobile){this._closeDropdown()}this.telInput.off(this.ns);if(this.isMobile){this.countryList.off(this.ns)}else{this.selectedFlagInner.parent().off(this.ns);this.telInput.closest("label").off(this.ns)}var c=this.telInput.parent();c.before(this.telInput).remove()},getExtension:function(){return this.telInput.val().split(" ext. ")[1]||""},getNumber:function(c){if(k.intlTelInputUtils){return intlTelInputUtils.formatNumberByType(this.telInput.val(),this.selectedCountryData.iso2,c)}return""},getNumberType:function(){if(k.intlTelInputUtils){return intlTelInputUtils.getNumberType(this.telInput.val(),this.selectedCountryData.iso2)}return -99},getSelectedCountryData:function(){return this.selectedCountryData||{}},getValidationError:function(){if(k.intlTelInputUtils){return intlTelInputUtils.getValidationError(this.telInput.val(),this.selectedCountryData.iso2)}return -99},isValidNumber:function(){var i=g.trim(this.telInput.val()),c=this.options.nationalMode?this.selectedCountryData.iso2:"";if(k.intlTelInputUtils){return intlTelInputUtils.isValidNumber(i,c)}return false},loadUtils:function(i){var c=i||this.options.utilsScript;if(!g.fn[j].loadedUtilsScript&&c){g.fn[j].loadedUtilsScript=true;g.ajax({url:c,success:function(){g(".intl-tel-input input").intlTelInput("utilsLoaded")},dataType:"script",cache:true})}},selectCountry:function(c){c=c.toLowerCase();if(!this.selectedFlagInner.hasClass(c)){this._selectFlag(c,true);this._updateDialCode(this.selectedCountryData.dialCode,false)}},setNumber:function(p,q,i,c){if(!this.options.nationalMode&&p.charAt(0)!="+"){p="+"+p}this._updateFlagFromNumber(p);this._updateVal(p,q,i,c)},utilsLoaded:function(){if(this.options.autoFormat&&this.telInput.val()){this._updateVal(this.telInput.val())}this._updatePlaceholder()}};g.fn[j]=function(i){var c=arguments;if(i===d||typeof i==="object"){return this.each(function(){if(!g.data(this,"plugin_"+j)){g.data(this,"plugin_"+j,new n(this,i))}})}else{if(typeof i==="string"&&i[0]!=="_"&&i!=="init"){var p;this.each(function(){var q=g.data(this,"plugin_"+j);if(q instanceof n&&typeof q[i]==="function"){p=q[i].apply(q,Array.prototype.slice.call(c,1))}if(i==="destroy"){g.data(this,"plugin_"+j,null)}});return p!==d?p:this}}};g.fn[j].getCountryData=function(){return b};var b=[["Afghanistan (Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†)","af","93"],["Albania (ShqipÃ«ri)","al","355"],["Algeria (Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Õ€Õ¡ÕµÕ¡Õ½Õ¿Õ¡Õ¶)","am","374"],["Aruba","aw","297"],["Australia","au","61"],["Austria (Ã–sterreich)","at","43"],["Azerbaijan (AzÉ™rbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (Ø§Ù„Ø¨Ø­Ø±ÙŠÙ†)","bh","973"],["Bangladesh (à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶)","bd","880"],["Barbados","bb","1246"],["Belarus (Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÑŒ)","by","375"],["Belgium (BelgiÃ«)","be","32"],["Belize","bz","501"],["Benin (BÃ©nin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (à½ à½–à¾²à½´à½‚)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (áž€áž˜áŸ’áž–áž»áž‡áž¶)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (RÃ©publique centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (ä¸­å›½)","cn","86"],["Colombia","co","57"],["Comoros (Ø¬Ø²Ø± Ø§Ù„Ù‚Ù…Ø±)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["CÃ´te dâ€™Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["CuraÃ§ao","cw","599",0],["Cyprus (ÎšÏÏ€ÏÎ¿Ï‚)","cy","357"],["Czech Republic (ÄŒeskÃ¡ republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (RepÃºblica Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (Ù…ØµØ±)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (FÃ¸royar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358"],["France","fr","33"],["French Guiana (Guyane franÃ§aise)","gf","594"],["French Polynesia (PolynÃ©sie franÃ§aise)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (áƒ¡áƒáƒ¥áƒáƒ áƒ—áƒ•áƒ”áƒšáƒ)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Î•Î»Î»Î¬Î´Î±)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guinea (GuinÃ©e)","gn","224"],["Guinea-Bissau (GuinÃ© Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (é¦™æ¸¯)","hk","852"],["Hungary (MagyarorszÃ¡g)","hu","36"],["Iceland (Ãsland)","is","354"],["India (à¤­à¤¾à¤°à¤¤)","in","91"],["Indonesia","id","62"],["Iran (Ø§ÛŒØ±Ø§Ù†)","ir","98"],["Iraq (Ø§Ù„Ø¹Ø±Ø§Ù‚)","iq","964"],["Ireland","ie","353"],["Israel (×™×©×¨××œ)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (æ—¥æœ¬)","jp","81"],["Jordan (Ø§Ù„Ø£Ø±Ø¯Ù†)","jo","962"],["Kazakhstan (ÐšÐ°Ð·Ð°Ñ…ÑÑ‚Ð°Ð½)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kuwait (Ø§Ù„ÙƒÙˆÙŠØª)","kw","965"],["Kyrgyzstan (ÐšÑ‹Ñ€Ð³Ñ‹Ð·ÑÑ‚Ð°Ð½)","kg","996"],["Laos (àº¥àº²àº§)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (Ù„Ø¨Ù†Ø§Ù†)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (Ù„ÙŠØ¨ÙŠØ§)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (æ¾³é–€)","mo","853"],["Macedonia (FYROM) (ÐœÐ°ÐºÐµÐ´Ð¾Ð½Ð¸Ñ˜Ð°)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠØ§)","mr","222"],["Mauritius (Moris)","mu","230"],["Mexico (MÃ©xico)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (ÐœÐ¾Ð½Ð³Ð¾Ð»)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (Ø§Ù„Ù…ØºØ±Ø¨)","ma","212"],["Mozambique (MoÃ§ambique)","mz","258"],["Myanmar (Burma) (á€™á€¼á€”á€ºá€™á€¬)","mm","95"],["Namibia (NamibiÃ«)","na","264"],["Nauru","nr","674"],["Nepal (à¤¨à¥‡à¤ªà¤¾à¤²)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-CalÃ©donie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (ì¡°ì„  ë¯¼ì£¼ì£¼ì˜ ì¸ë¯¼ ê³µí™”êµ­)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47"],["Oman (Ø¹ÙÙ…Ø§Ù†)","om","968"],["Pakistan (Ù¾Ø§Ú©Ø³ØªØ§Ù†)","pk","92"],["Palau","pw","680"],["Palestine (ÙÙ„Ø³Ø·ÙŠÙ†)","ps","970"],["Panama (PanamÃ¡)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (PerÃº)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (Ù‚Ø·Ø±)","qa","974"],["RÃ©union (La RÃ©union)","re","262"],["Romania (RomÃ¢nia)","ro","40"],["Russia (Ð Ð¾ÑÑÐ¸Ñ)","ru","7",0],["Rwanda","rw","250"],["Saint BarthÃ©lemy (Saint-BarthÃ©lemy)","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie franÃ§aise))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["SÃ£o TomÃ© and PrÃ­ncipe (SÃ£o TomÃ© e PrÃ­ncipe)","st","239"],["Saudi Arabia (Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©)","sa","966"],["Senegal (SÃ©nÃ©gal)","sn","221"],["Serbia (Ð¡Ñ€Ð±Ð¸Ñ˜Ð°)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (ëŒ€í•œë¯¼êµ­)","kr","82"],["South Sudan (Ø¬Ù†ÙˆØ¨ Ø§Ù„Ø³ÙˆØ¯Ø§Ù†)","ss","211"],["Spain (EspaÃ±a)","es","34"],["Sri Lanka (à·à·Šà¶»à·“ à¶½à¶‚à¶šà·à·€)","lk","94"],["Sudan (Ø§Ù„Ø³ÙˆØ¯Ø§Ù†)","sd","249"],["Suriname","sr","597"],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (Ø³ÙˆØ±ÙŠØ§)","sy","963"],["Taiwan (å°ç£)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (à¹„à¸—à¸¢)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (ØªÙˆÙ†Ø³)","tn","216"],["Turkey (TÃ¼rkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Ð£ÐºÑ€Ð°Ñ—Ð½Ð°)","ua","380"],["United Arab Emirates (Ø§Ù„Ø¥Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©)","ae","971"],["United Kingdom","gb","44"],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (OÊ»zbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (CittÃ  del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Viá»‡t Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Yemen (Ø§Ù„ÙŠÙ…Ù†)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"]];for(var f=0;f<b.length;f++){var l=b[f];b[f]={name:l[0],iso2:l[1],dialCode:l[2],priority:l[3]||0,areaCodes:l[4]||null}}});
