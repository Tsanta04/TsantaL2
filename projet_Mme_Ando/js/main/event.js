// How to display All menus
menu_home.addEventListener("click",function(e){
    e.preventDefault();
    show_home();
});

menu_checkout.addEventListener("click",function(e){
    e.preventDefault();
    show_checkout();
});

menu_shop.addEventListener("click",function(e){
    e.preventDefault();
    show_shop();
});

menu_cart.addEventListener("click",function(e){
    e.preventDefault();
    show_cart_menu();
});

document.querySelector("footer [href='cart.html']").addEventListener("click",function(e){
    e.preventDefault();
    show_cart_menu();
});

document.querySelector("footer [href='checkout.html']").addEventListener("click",function(e){
    e.preventDefault();
    show_checkout();
});

const elt_shop = document.querySelectorAll("[href='shop.html']");
elt_shop.forEach(elt => {
    elt.addEventListener("click",function(e){
        e.preventDefault();
        show_shop();
    });  
});

// Filter by sort select
const elt_sort = sort.childNodes;
for(let i=0;i<elt_sort.length;i++){
    elt_sort[i].addEventListener("click",function(){
        //console.log(elt_sort[i].innerHTML);
        filter("status",elt_sort[i].innerHTML);
    });
}

// Manage search
search_input.addEventListener("input",function(e){
    filter("All",e.target.value);
    more_detail.style.display="none";
    shop_content.style.display="flex";
    cart_table.style.display="none";
    home.style.display="none";
    checkout.style.display="none";
});

// Show cart resume
show_cart.forEach(sh_cart => {
    sh_cart.addEventListener("click",function(){
        if(cart_table.style.display=="block"){
            show_menu();
        }
        else{
            cart_table.style.display="block";
            more_detail.style.display="none";
            shop_content.style.display="none";
            home.style.display="none";
            checkout.style.display="none";
        }
        paginate.style.display="none";
        document.getElementById("srt").style.opacity="0";
    });        
});

// Click add_cart button
add_card_btn.addEventListener("click",function(e){
    e.preventDefault();
    const prix = parseInt(more_detail.querySelector(".prix").innerHTML)*qty.value;
    const num = cart_num[0].innerHTML;
    const tr = document.createElement("tr");

    tr.setAttribute("accessKeyLabel",more_detail.querySelector(".nom").innerHTML);
    tr.innerHTML = "<td class='cart_product_img'><a href='#'><img src='"+more_detail.querySelector(".imageSrc1").src+"' alt='Product'></a></td><td class='cart_product_desc'><h5>"+more_detail.querySelector(".nom").innerHTML+"</h5></td><td class='price'><span>"+more_detail.querySelector(".prix").innerHTML+"</span></td><td class='qty'><span>"+qty.value+"</span></td><td class='total'><span>"+prix+"$</span></td>";

    card_list.appendChild(tr);        
    cart_num[0].innerHTML = parseInt(parseInt(num) + parseInt(qty.value));
    cart_num[1].innerHTML = parseInt(parseInt(num) + parseInt(qty.value));

    div_state_after_add_cart();
    register("add-cart",more_detail.querySelector(".nom").innerHTML);

    putDatas();
    show_shop();    

});

// Click remove cart_button
remove_card_btn.addEventListener("click",function(e){
    e.preventDefault();
    const num = cart_num[0].innerHTML;
    const elt = card_list.querySelector("[accessKeyLabel = '"+more_detail.querySelector(".nom").innerHTML+"']");
    cart_num[0].innerHTML = parseInt(parseInt(num) - parseInt(elt.querySelector(".qty span").innerHTML));
    cart_num[1].innerHTML = parseInt(parseInt(num) - parseInt(elt.querySelector(".qty span").innerHTML));

    card_list.removeChild(elt);
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").querySelector(".click-detail").style.backgroundColor="transparent";
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").style.display="block";
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").max = "";

    register("remove-cart",more_detail.querySelector(".nom").innerHTML);
    more_detail.style.display="none";
    shop_content.style.display="flex";
    cart_table.style.display="none";
});

// Click update_cart button
update_card_btn.addEventListener("click",function(e){
    e.preventDefault();
    const num = cart_num[0].innerHTML;
    const elt = card_list.querySelector("[accessKeyLabel = '"+more_detail.querySelector(".nom").innerHTML+"']");
    const prix = parseInt(more_detail.querySelector(".prix").innerHTML)*qty.value;
    cart_num[0].innerHTML = parseInt(parseInt(num) - parseInt(elt.querySelector(".qty span").innerHTML) + parseInt(qty.value));
    cart_num[1].innerHTML = parseInt(parseInt(num) - parseInt(elt.querySelector(".qty span").innerHTML) + parseInt(qty.value));
    console.log(elt);
    elt.querySelector(".price").innerHTML = "<span>"+more_detail.querySelector(".prix").innerHTML+"</span>";
    elt.querySelector(".qty").innerHTML = "<span>"+qty.value+"</span>";
    elt.querySelector(".total").innerHTML = "<span>"+prix+"$</span>";

    div_state_after_add_cart();
    register("add-cart",more_detail.querySelector(".nom").innerHTML);
    putDatas();
    show_shop();    
});

// Show favorites (adorEs)
show_fav.forEach(sh_fav => {
    sh_fav.addEventListener("click",function(){
        if(shop_content.title=="1"){
            show_menu();
            shop_content.title="0";            
        }
        else if((shop_content.title="0")||(shop_content.title="")){
            putDatas();
            const elts = shop_content.childNodes;
            console.log(elts[0].querySelector(".put_fav i"));
            for(let i=0;i<elts.length;i++){
                if(elts[i].querySelector(".put_fav i").style.color != "red"){
                    elts[i].style.display="none";
                }
            }
            shop_content.title="1";            
        }
        // paginate.style.display="none";
        document.getElementById("srt").style.opacity="0";
    });        
});

// Show checkout form
chkout.addEventListener("click",function(e){
    e.preventDefault();
    // document.querySelector(".amado_product_area").style.display="none";
    document.querySelector(".shop_sidebar_area").style.display="none";
    document.getElementById("srt").style.opacity="0";
    more_detail.style.display="none";
    shop_content.style.display="none";
    cart_table.style.display="none";
    home.style.display="none";
    checkout.style.display="block";
    paginate.style.display="none";
    document.getElementById("srt").style.opacity="0";
});

// Show detail of a collection
document.addEventListener("click",function(e){
    card_show_it(e);
});

// Manage max quantity of one collection (to limit the quantity value)
qty.nextElementSibling.addEventListener("click",function(){
    const num = more_detail.querySelector("#qty").max;
    console.log("ity no"+num);
    if(qty.value>=num)qty.value = num;
    const val = num - qty.value;
    put_val(more_detail,".stock",val);
});
qty.previousElementSibling.addEventListener("click",function(){
    const val = more_detail.querySelector("#qty").max - qty.value;
    put_val(more_detail,".stock",val);
});
qty.addEventListener("input",function(){
    const val = more_detail.querySelector("#qty").max - qty.value;
    put_val(more_detail,".stock",val);
});

// Manage promo -- the code promo is j1XERT5
promo_button.addEventListener("click",function(e){
    e.preventDefault();
    promo_input.style.display="block";
    promo_apply_button.style.display="block";
});

promo_apply_button.addEventListener("click",function(e){
    e.preventDefault();
    manage_promo(promo_input.childNodes[1].value);
});
