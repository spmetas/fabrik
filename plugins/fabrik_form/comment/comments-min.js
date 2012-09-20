var FabrikComment=new Class({Implements:[Options,Events],getOptions:function(){return{formid:0,rowid:0,label:""}},initialize:function(b,a){this.element=document.id(b);if(typeOf(this.element)==="null"){return}this.setOptions(this.getOptions(),a);this.fx={};this.fx.toggleForms=$H();this.spinner=new Spinner("fabrik-comments",{message:"loading"});this.doAjaxDeleteComplete=this.deleteComplete.bindWithEvent(this);this.ajax={};this.ajax.deleteComment=new Request({url:"",method:"get",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"comment",method:"deleteComment",g:"form",formid:this.options.formid,rowid:this.options.rowid},onComplete:function(c){this.deleteComplete(c)}.bind(this)});this.ajax.updateComment=new Request({url:"",method:"post",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"comment",method:"updateComment",g:"form",formid:this.options.formid,rowid:this.options.rowid}});this.watchReply();this.watchInput()},ajaxComplete:function(e){e=JSON.decode(e);var c=(e.depth.toInt()*20)+"px";var f="comment_"+e.id;var a=new Element("li",{id:f,styles:{"margin-left":c}}).set("html",e.content);if(this.currentLi.get("tag")==="li"){a.inject(this.currentLi,"after")}else{a.inject(this.currentLi)}var b=new Fx.Tween(a,{property:"opacity",duration:5000});b.set(0);b.start(0,100);this.watchReply();if(typeOf(e.message)!=="null"){alert(e.message.title,e.message.message)}this.spinner.hide();this.watchInput();this.updateDigg()},watchInput:function(){this.ajax.addComment=new Request({url:"index.php",method:"get",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"comment",method:"addComment",g:"form",formid:this.options.formid,rowid:this.options.rowid,label:this.options.label},onSuccess:function(a){this.ajaxComplete(a)}.bind(this),onError:function(b,a){fconsole(b+": "+a);this.spinner.hide()}.bind(this),onFailure:function(a){alert(a.statusText);this.spinner.hide()}.bind(this)});this.element.getElements(".replyform").each(function(b){var a=b.getElement("textarea");if(!a){return}b.getElement("input[type=button]").addEvent("click",function(c){this.doInput(c)}.bind(this));a.addEvent("click",function(c){this.testInput(c)}.bind(this))}.bind(this))},testInput:function(a){if(a.target.get("value")===Joomla.JText._("PLG_FORM_COMMENT_TYPE_A_COMMENT_HERE")){a.target.value=""}},updateDigg:function(){if(typeOf(this.digg)!=="null"){this.digg.removeEvents();this.digg.addEvents()}},doInput:function(h){this.spinner.show();var i=h.target.getParent(".replyform");if(i.id==="master-comment-form"){var l=this.element.getElement("ul").getElements("li");if(l.length>0){this.currentLi=l.pop()}else{this.currentLi=this.element.getElement("ul")}}else{this.currentLi=i.findUp("li")}if(h.type==="keydown"){if(h.keyCode.toInt()!==13){this.spinner.hide();return}}var k=i.getElement("textarea").get("value");if(k===""){this.spinner.hide();alert(Joomla.JText._("PLG_FORM_COMMENT_PLEASE_ENTER_A_COMMENT_BEFORE_POSTING"));return}h.stop();var b=i.getElement("input[name=name]");if(b){var f=b.get("value");if(f===""){this.spinner.hide();alert(Joomla.JText._("PLG_FORM_COMMENT_PLEASE_ENTER_A_NAME_BEFORE_POSTING"));return}this.ajax.addComment.options.data.name=f}var g=i.getElements("input[name^=comment-plugin-notify]").filter(function(e){return e.checked});var j=i.getElement("input[name=email]");if(j){var d=j.get("value");if(d===""){this.spinner.hide();alert(Joomla.JText._("PLG_FORM_COMMENT_ENTER_EMAIL_BEFORE_POSTNG"));return}}var a=i.getElement("input[name=reply_to]").get("value");if(a===""){a=0}if(i.getElement("input[name=email]")){this.ajax.addComment.options.data.email=i.getElement("input[name=email]").get("value")}this.ajax.addComment.options.data.renderOrder=i.getElement("input[name=renderOrder]").get("value");if(i.getElement("select[name=rating]")){this.ajax.addComment.options.data.rating=i.getElement("select[name=rating]").get("value")}if(i.getElement("input[name^=annonymous]")){var c=i.getElements("input[name^=annonymous]").filter(function(e){return e.checked===true});this.ajax.addComment.options.data.annonymous=c[0].get("value")}this.ajax.addComment.options.data.reply_to=a;this.ajax.addComment.options.data.comment=k;this.ajax.addComment.send();this.element.getElement("textarea").value=""},saveComment:function(b){var a=b.getParent(".comment").id.replace("comment-","");this.ajax.updateComment.options.data.comment_id=a;this.ajax.updateComment.options.data.comment=b.get("text");this.ajax.updateComment.send()},watchReply:function(){this.spinner.resize();this.element.getElements(".replybutton").each(function(c){var e;c.removeEvents();var d=c.getParent().getParent().getNext();if(typeOf(d)==="null"){d=c.getParent(".comment").getElement(".replyform")}if(typeOf(d)!=="null"){var b=c.getParent(".comment").findUp("li");if(window.ie){e=new Fx.Slide(d,"opacity",{duration:5000})}else{if(this.fx.toggleForms.has(b.id)){e=this.fx.toggleForms.get(b.id)}else{e=new Fx.Slide(d,"opacity",{duration:5000});this.fx.toggleForms.set(b.id,e)}}e.hide();c.addEvent("click",function(a){a.stop();e.toggle()}.bind(this))}}.bind(this));this.element.getElements(".del-comment").each(function(b){b.removeEvents();b.addEvent("click",function(a){this.ajax.deleteComment.options.data.comment_id=a.target.getParent(".comment").id.replace("comment-","");this.ajax.deleteComment.send();this.updateDigg();a.stop()}.bind(this))}.bind(this));if(this.options.admin){this.element.getElements(".comment-content").each(function(b){b.removeEvents();b.addEvent("click",function(d){b.inlineEdit({defaultval:"",type:"textarea",onComplete:function(c,g,e){this.saveComment(c)}.bind(this)});var f=d.target.getParent();var a=f.id.replace("comment-","");new Request({url:"",method:"get",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"comment",method:"getEmail",commentid:a,g:"form",formid:this.options.formid,rowid:this.options.rowid},onComplete:function(c){f.getElements(".info").dispose();new Element("span",{"class":"info"}).set("html",c).inject(f)}.bind(this)}).send();d.stop()}.bind(this))}.bind(this))}},deleteComplete:function(b){var d=document.id("comment_"+b);var a=new Fx.Morph(d,{duration:1000,transition:Fx.Transitions.Quart.easeOut});a.start({opacity:0,height:0}).chain(function(){d.dispose()})}});