// ==UserScript==
// @name        vk_remove_ad_posts
// @namespace   vk.com
// @version     1
// @grant      none
// @copyright  Evgeny Sergeev 
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }

  // Функция для добавления обработчика событий
function addHandler(object, event, handler, useCapture) {
    if (object.addEventListener) {
        object.addEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + event, handler);
    } else alert("Add handler is not supported");
}
// Добавляем обработчики
/* Gecko */
addHandler(window, 'DOMMouseScroll', wheel);
/* Opera */
addHandler(window, 'mousewheel', wheel);
/* IE */
addHandler(document, 'mousewheel', wheel);
// Обработчик события

    
  // [4] дополнительная проверка наряду с @include
  //  if (/http:\/\/userscripts.org/.test(w.location.href)) {
  //      //Ниже идёт непосредственно код скрипта
  //      alert("Userscripts приветствует вас навязчивым окном.");
  //  }
  console.log('На страже от рекламы!');

  function wheel(event) {
    //console.log("Scroll...");
    var list = document.getElementsByClassName('wall_text_name_explain_promoted_post');
    
    if(list)
    {
      for (var i = 0; i < list.length; i++) {
        //console.log(list[i].innerText); //second console output
          
        if(list[i].innerText == "Рекламная запись"){
            var block = list[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            console.log("Рекламная запись удалена");
            block.remove();
        }
      }
    }
      
    var list = document.getElementsByClassName('wall_marked_as_ads');
    if(list)
    {
      for (var i = 0; i < list.length; i++) {
        //console.log(list[i].innerText); //second console output

            var block = list[i].parentNode.parentNode.parentNode.parentNode.parentNode;
            console.log("Рекламная в ленте удалена");
            block.remove();
      }
    }
  }

})(window);
