// localStorage.clear();

// All functions

//Function displaying information of ArtMi gotten by json
async function ourInformation(){
    const datas = await getData("../../json/who_we_are.json");

//Mission 
    mission_img.src = datas[0]["img"];
    mission_title.innerHTML = datas[0]["title"];
    mission_text.innerHTML = datas[0]["description"];

//Gallery
    gallery_img.src = datas[1]["img"];
    gallery_title.innerHTML = datas[1]["title"];
    gallery_text.innerHTML = datas[1]["description"];

    console.log("Teto zah eh");
}

// To remember all numbers of favorites/carts
function putAnotherData(){
    if((localStorage.getItem("favorite_number")!="")&&(localStorage.getItem("favorite_number")!=null))fav_num[0].innerHTML=fav_num[1].innerHTML=localStorage.getItem("favorite_number");
    if((localStorage.getItem("cart_number")!="")&&(localStorage.getItem("cart_number")!=null))cart_num[0].innerHTML=cart_num[1].innerHTML=localStorage.getItem("cart_number");
    if((localStorage.getItem("cart_content")!="")&&(localStorage.getItem("cart_content")!=null))card_list.innerHTML=card_list.innerHTML=localStorage.getItem("cart_content");    
    subtotal_checkout.innerHTML = localStorage.getItem("total");
    subtotal.innerHTML = localStorage.getItem("total");
    if((parseInt(localStorage.getItem("total")))==0){
        total.innerHTML="0Ar";
        total_checkout.innerHTML = "0Ar";
    }
    else if((parseInt(localStorage.getItem("total")))!=0){
        total.innerHTML = ((parseInt(localStorage.getItem("total")))+1000)+"Ar";
        total_checkout.innerHTML = ((parseInt(localStorage.getItem("total")))+1000)+"Ar";
    } 
}

// List all type of collections
async function listCatagorie(filtre){
    const datas = await getData("../../json/type_produits.json");
    div_catagorie.innerHTML="";

    const li_default = document.createElement("li");
    const a_default = document.createElement("a");
    a_default.setAttribute("href","#");
    a_default.innerHTML = "Tous";
    li_default.appendChild(a_default);
    li_default.addEventListener("click",function(event){
        event.preventDefault();
        putDatas();
        show_shop();
    });
    div_catagorie.appendChild(li_default);

    for(let i=0;i<datas.length;i++){
        const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("href","#");
            a.innerHTML = datas[i]["title"];
        li.appendChild(a);
        li.addEventListener("click",function(event){
            event.preventDefault();
            filter("type",event.target.innerHTML);
            console.log("ttt");
        });
        div_catagorie.appendChild(li);
    }
    sortByDate.querySelector("[value='0']").setAttribute("selected","");
}

// Put all collections in json
async function putDatas(){
    if((localStorage.getItem("allDatas")=="")||(localStorage.getItem("allDatas")==null)){
        const datas = await getData("../../json/all.json");
        shop_content.innerHTML="";
        for(let i=0;i<datas.length;i++){
            const div = document.createElement("div");
            div.setAttribute("accessKeyLabel",datas[i]["nom"]);
            div.setAttribute("class","col-12 col-sm-6 col-md-12 col-xl-6");
            div.innerHTML="<div class='single-product-wrapper'><div class='product-img'><img src='"+datas[i]["img"]+"' alt=''><img class='hover-img' src='"+datas[i]["img1"]+"' alt=''></div><div class='product-description d-flex align-items-center justify-content-between'><div class='product-meta-data'><div class='line'></div><p class='product-price'>"+datas[i]["prix"]+"</p><p class='product-price promo-price'></p><a href='#'><h6 class='product-name'>"+datas[i]["nom"]+"</h6></a></div><div class='other'><p class='artiste'>"+datas[i]["artiste"]+"</p><p class='type'>"+datas[i]["type"]+"</p><p class='detail'>"+datas[i]["detail"]+"</p><p class='prix_reduced'></p><p class='stock'>"+datas[i]["stock"]+"</p><p class='status'>"+datas[i]["status"]+"</p></div><div class='ratings-cart text-right'><div class='ratings'><i class='fa fa-star' aria-hidden='true'></i><i class='fa fa-star' aria-hidden='true'></i><i class='fa fa-star' aria-hidden='true'></i><i class='fa fa-star' aria-hidden='true'></i><i class='fa fa-star' aria-hidden='true'></i></div><div class='cart'><a href='#' class='put_fav'><i class='fa fa-heart favorite'></i></a><a href='cart.html' class='click-detail' data-toggle='tooltip' data-placement='left' title='Add to Cart' style='background-color:transparent;padding:10px;border-radius:40px;'><img src='img/core-img/cart.png' alt=''></a></div></div></div></div>";
            shop_content.appendChild(div);
        }
        localStorage.setItem("allDatas",shop_content.innerHTML);
    }

    shop_content.innerHTML = localStorage.getItem("allDatas");

    const elts = shop_content.childNodes;
    for(let i=0;i<elts.length;i++){
        var data = giveData(elts[i]);
        elts[i].querySelector(".promo-price").innerHTML=data["prix_red"];
        eventDetail(elts[i],data);
    }

    sortByDate.querySelector("[value='0']").setAttribute("selected","");
}

// HOw to filter datas by sort select/search input
async function filter(type,name){
    shop_content.innerHTML = localStorage.getItem("allDatas");
    const elts = shop_content.childNodes;
    for(let i=0;i<elts.length;i++){
        var data = giveData(elts[i]);
        eventDetail(elts[i],data);
        if(type!="All"){
            if((data[type]!=name)&&(name!="--")){
                elts[i].style.display = "none";
            }
            else if(name=="--"){
                putDatas();
            }
        }
        else{
            var bool=false;
            for(let key in data){
                if(data[key].includes(name)){
                    bool=true;
                    break;
                }                
            };
            if(!bool){
                elts[i].style.display = "none";                
            }
        }
    }

    more_detail.style.display="none";
    cart_table.style.display="none";
    shop_content.style.display="flex";
    pagination();
    //    paginate.style.display="none";
}

// Value of Single detail collection area (after click)
function put_val(div,attr,value){
    const elt = div.querySelectorAll(attr);
    console.log(elt);
    for(let i=0;i<elt.length;i++){
        if((attr==".imageSrc1")||(attr==".imageSrc2")){
            elt[i].src=value;            
        }
        else if((attr==".imageBg1")||(attr==".imageBg2")){
            elt[i].style.backgroundImage="url("+value+")";
        }
        else if(attr==".imageHref"){
            elt[i].href=value;            
        }
        else{
            elt[i].innerHTML=value;
        }
    }
}

// What button will appear wher we click the detail of a collection
function display_button(div,data){
    const status = div.querySelector(".click-detail").style.backgroundColor;
    console.log(status);
    if(status!="green"){
        update_card_btn.style.display="none";
        remove_card_btn.style.display="none";        
        add_card_btn.style.display = "block";
    }
    if(status=="green"){
        update_card_btn.style.display="block";
        remove_card_btn.style.display="block";        
        add_card_btn.style.display = "none";        
    }
    wrong_code.style.display="none";
    promo_input.style.display="none";
    promo_apply_button.style.display="none";
    promo_button.style.display="block";
    more_detail.style.display="block";
    shop_content.style.display="none";
    cart_table.style.display="none";
    paginate.style.display="none";
    document.getElementById("srt").style.opacity="0";
}

// Detail of collection
function eventDetail(div,data){
    div.querySelector(".product-img").addEventListener("click",function(){
        try{
            qty.value=parseInt(card_list.querySelector("[accessKeyLabel='"+data["nom"]+"']").querySelector(".qty span").innerHTML);
        }
        catch(e){
            qty.value=1;
        }
        put_val(more_detail,".nom",data["nom"]);
        put_val(more_detail,".artiste",data["artiste"]);
        put_val(more_detail,".detail",data["detail"]);
        put_val(more_detail,".imageBg1",data["img"]);
        put_val(more_detail,".imageBg2",data["img1"]);
        put_val(more_detail,".imageSrc1",data["img"]);        
        put_val(more_detail,".imageSrc2",data["img1"]);        
        put_val(more_detail,".imageHref",data["img"]);        
        put_val(more_detail,".prix",data["prix"]);
        put_val(more_detail,".promo-price",data["prix_red"]);
        put_val(more_detail,".stock",(data['stock']-qty.value));
        put_val(more_detail,".status",data["status"]);

        more_detail.querySelector("#qty").max=data['stock'];
        
        display_button(div,data);
    });
    div.querySelector(".click-detail").addEventListener("click",function(e){
        e.preventDefault();
        qty.value=div.max;
        if((div.max == "")||(div.max == null))qty.value=1;
        put_val(more_detail,".nom",data["nom"]);
        put_val(more_detail,".artiste",data["artiste"]);
        put_val(more_detail,".detail",data["detail"]);
        put_val(more_detail,".imageBg",data["img"]);
        put_val(more_detail,".imageSrc1",data["img"]);        
        put_val(more_detail,".imageSrc2",data["img1"]);        
        put_val(more_detail,".imageHref",data["img"]);        
        put_val(more_detail,".prix",data["prix"]);
        put_val(more_detail,".promo-price",data["prix_red"]);
        put_val(more_detail,".stock",(data['stock']-qty.value));
        put_val(more_detail,".status",data["status"]);

        more_detail.querySelector("#qty").max=data['stock'];
        
        display_button(div,data);
    });
    div.querySelector(".put_fav").addEventListener("click",function(e){
        e.preventDefault();

        if(div.querySelector(".favorite").style.color!="red"){
            div.querySelector(".favorite").style.color="red";
            fav_num[0].innerHTML = parseInt(fav_num[0].innerHTML)+1;
            fav_num[1].innerHTML = parseInt(fav_num[1].innerHTML)+1;
        }
        else if(div.querySelector(".favorite").style.color=="red"){
            div.querySelector(".favorite").style.color="rgba(73, 72, 72, 0.781)";
            fav_num[0].innerHTML = parseInt(fav_num[0].innerHTML)-1;
            fav_num[1].innerHTML = parseInt(fav_num[1].innerHTML)-1;
        };
        register("favorite",data['nom']);
        
    });
    // div.querySelector(".product-img").addEventListener("doubleclick",function(e){
    //     e.preventDefault();
    //     fav_num.innerHTML = parseInt(fav_num.innerHTML)+1;
    //     div.querySelector(".favorite").style.color="red";
    // });
}

// Detail of collection (clicked in the cart_list)
async function onclick_image_for_detail(tr,accessKeyLabel){
        putDatas();
        const div = shop_content.querySelector("[accessKeyLabel='"+accessKeyLabel+"']");
        const data = giveData(div);
        console.log(shop_content.childNodes[0]);
        qty.value=parseInt(tr.querySelector(".qty span").innerHTML);
        console.log(qty.value);

        put_val(more_detail,".nom",data["nom"]);
        put_val(more_detail,".artiste",data["artiste"]);
        put_val(more_detail,".detail",data["detail"]);
        put_val(more_detail,".imageBg1",data["img"]);
        put_val(more_detail,".imageBg2",data["img1"]);
        put_val(more_detail,".imageSrc1",data["img"]);        
        put_val(more_detail,".imageSrc2",data["img1"]);        
        put_val(more_detail,".imageHref",data["img"]);        
        put_val(more_detail,".prix",data["prix"]);
        put_val(more_detail,".promo-price",data["prix_red"]);
        put_val(more_detail,".stock",(data['stock']-qty.value));
        put_val(more_detail,".status",data["status"]);

        more_detail.querySelector("#qty").max=data['stock'];
        
        display_button(div,data);        
}

// State of the cart icon after adding or not to the cart
function div_state_after_add_cart(){
    recu();
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").querySelector(".click-detail").style.backgroundColor="green";
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").style.display="block";
    shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").max = qty.value;

    console.log(more_detail.querySelector(".stock").innerHTML);
    if(parseInt(more_detail.querySelector(".stock").innerHTML)==0){
        shop_content.querySelector("[accessKeyLabel='"+more_detail.querySelector(".nom").innerHTML+"']").style.display="none";
    }

}

// How to manage the "recu"
function recu(){
    const les_prix = card_list.querySelectorAll(".price span");
    const les_qty = card_list.querySelectorAll(".qty span");
    var ttl = 0;
    console.log("Ireto avy:");
    console.log(les_prix);
    for(let i=0;i<les_prix.length;i++){
        ttl+= (parseInt(les_prix[i].innerHTML) * parseInt(les_qty[i].innerHTML));
    }

    subtotal_checkout.innerHTML = ttl+"Ar";
    subtotal.innerHTML = ttl+"Ar";
    if(ttl==0){
        total_checkout.innerHTML = (ttl)+"Ar";
        total.innerHTML = (ttl)+"Ar";
    }
    else{
        total_checkout.innerHTML = (ttl+1000)+"Ar";  
        total.innerHTML = (ttl+1000)+"Ar";
    } 
    localStorage.setItem("total",(ttl)+"Ar");
}

// To give datas in the json
function giveData(elts){
    var data = {
        "nom":elts.querySelector(".product-name").innerHTML,
        "img":elts.querySelector(".product-img img").src,
        "img1":elts.querySelector(".hover-img").src,
        "artiste":elts.querySelector(".other .artiste").innerHTML,
        "prix":elts.querySelector(".product-price").innerHTML,
        "prix_red":elts.querySelector(".other .prix_reduced").innerHTML,
        "detail":elts.querySelector(".other .detail").innerHTML,
        "type":elts.querySelector(".other .type").innerHTML,
        "stock":elts.querySelector(".other .stock").innerHTML,
        "status":elts.querySelector(".other .status").innerHTML
    };
    return data;
}

// Register data to not lose it after refresh (the broswer)
function register(type,name){
    const doc = document.createElement("div");
    doc.innerHTML = localStorage.getItem("allDatas");
    const div = doc.querySelector("[accessKeyLabel='"+name+"']");

    if(type=="favorite"){
        if(div.querySelector(".favorite").style.color!="red")div.querySelector(".favorite").style.color="red";
        else if(div.querySelector(".favorite").style.color=="red")div.querySelector(".favorite").style.color="rgba(73, 72, 72, 0.781)";
        localStorage.setItem("favorite_number",fav_num[0].innerHTML);
    }
    if(type=="add-cart"){
        div.querySelector(".click-detail").style.backgroundColor="green";
        div.max = qty.value;
        div.style.display = "block";
        if(parseInt(more_detail.querySelector(".stock").innerHTML)==0){
            div.accessKey = -1;
            div.style.display="none";
            console.log(div);
        }
        localStorage.setItem("cart_number",cart_num[0].innerHTML);        
        localStorage.setItem("cart_content",card_list.innerHTML);        
    }
    if(type=="remove-cart"){
        div.querySelector(".click-detail").style.backgroundColor="white";
        div.style.display="block";
        div.max = "";
        localStorage.setItem("cart_number",cart_num[0].innerHTML);        
        localStorage.setItem("cart_content",card_list.innerHTML);
    }
    if(type=="promo"){
        div.querySelector(".other .prix_reduced").innerHTML = more_detail.querySelector(".promo-price").innerHTML;
        div.querySelector(".product-price").innerHTML = more_detail.querySelector(".prix").innerHTML;        
        console.log(div.querySelector(".product-price").innerHTML);
    }

    localStorage.setItem("allDatas",doc.innerHTML);
}

// Title of displaying page
function setTitle(str){
    document.querySelectorAll(".title").forEach(elt => {
        elt.innerHTML = str;        
    });
}

// What/HOw to show menu functions

function show_menu(){
    if((localStorage.getItem("id_menu")=="")||(localStorage.getItem("id_menu")==null)||(localStorage.getItem("id_menu")=="1")){
        show_home();
        console.log(localStorage.getItem("id_menu"));
    }
    else{
        const menu = localStorage.getItem("id_menu");
        if(menu=="2")show_shop();
        if(menu=="3")show_cart_menu();
        if(menu=="4")show_checkout();
    }
}

function show_home(){
    setTitle("Acceuil");

    localStorage.setItem("id_menu","1");
    document.querySelector(".amado_product_area").style.display="block";
    document.querySelector(".shop_sidebar_area").style.display="none";
    more_detail.style.display="none";
    shop_content.style.display="none";
    cart_table.style.display="none";
    home.style.display="block";
    checkout.style.display="none";
    document.getElementById("srt").style.opacity="0";

    menu_home.setAttribute("class","active");
    menu_cart.setAttribute("class","");
    menu_shop.setAttribute("class","");
    menu_checkout.setAttribute("class","");
    paginate.style.display="none";
}

function show_shop(){
    setTitle("Collection");

    localStorage.setItem("id_menu","2");

    document.querySelector(".amado_product_area").style.display="block";
    document.querySelector(".shop_sidebar_area").style.display="block";
    document.getElementById("srt").style.opacity="1";

    more_detail.style.display="none";
    shop_content.style.display="flex";
    cart_table.style.display="none";
    home.style.display="none";
    checkout.style.display="none";

    menu_shop.setAttribute("class","active");
    menu_cart.setAttribute("class","");
    menu_home.setAttribute("class","");
    menu_checkout.setAttribute("class","");
    paginate.style.display="none";
    paginate.style.display="flex";
    listCatagorie();
    putDatas();    

    pagination();
}

function show_checkout(){
    setTitle("Caisse");
    
    localStorage.setItem("id_menu","4");
    document.querySelector(".amado_product_area").style.display="block";
    document.querySelector(".shop_sidebar_area").style.display="none";
    more_detail.style.display="none";
    shop_content.style.display="none";
    cart_table.style.display="none";
    home.style.display="none";
    checkout.style.display="block";
    document.getElementById("srt").style.opacity="0";

    menu_checkout.setAttribute("class","active");
    menu_cart.setAttribute("class","");
    menu_shop.setAttribute("class","");
    menu_home.setAttribute("class","");
    paginate.style.display="none";
    document.getElementById("srt").style.opacity="0";
}

function show_cart_menu() {
    setTitle("Panier");
    
    localStorage.setItem("id_menu","3");
    document.querySelector(".amado_product_area").style.display="block";
    document.querySelector(".shop_sidebar_area").style.display="none";

    more_detail.style.display="none";
    shop_content.style.display="none";
    cart_table.style.display="block";
    home.style.display="none";
    checkout.style.display="none";
    document.getElementById("srt").style.opacity="0";

    menu_cart.setAttribute("class","active");
    menu_home.setAttribute("class","");
    menu_shop.setAttribute("class","");
    menu_checkout.setAttribute("class","");
    paginate.style.display="none";
    document.getElementById("srt").style.opacity="0";
}

// Function of "Show detail of a collection" in event.js
function card_show_it(e){
    var test =0;
    card_list.querySelectorAll("tr").forEach(tr => {
        if(e.target == tr.childNodes[0].querySelector("a img")){
            e.preventDefault();
            console.log("l'accessKeyLabel = "+tr.getAttribute("accesskeylabel"));
            onclick_image_for_detail(tr,tr.getAttribute("accesskeylabel"));
        }
    });
    show_fav.forEach(sh_fav => {
        if(e.target == sh_fav.querySelector("a i")){
            test++;            
        }
    });
    if(e.target==chkout){
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
    }
    if(test==0){
        shop_content.title="0";            
    }
}

// Manage promo
async function manage_promo(value){
    const datas = await getData("../../json/promo.json");
    let isCode = false;
    console.log(value);
    datas.forEach(promo => {
        if(value==promo["code"]){
// COde

            let prixD = more_detail.querySelector(".promo-price").innerHTML;
            if(prixD==""){
                prixD = more_detail.querySelector(".prix").innerHTML;
            }

            let prix = parseInt(prixD) - parseInt(promo["reduction"]);
            put_val(more_detail,".promo-price",prixD);
            put_val(more_detail,".prix",prix+"Ar");
            console.log(value);
            wrong_code.style.display="none";
            promo_input.style.display="none";
            promo_apply_button.style.display="none";
            promo_button.style.display="none";
            paginate.style.display="none";
            document.getElementById("srt").style.opacity="0";
            isCode=true;
            register("promo",more_detail.querySelector(".nom").innerHTML);
        }
    });
    if(isCode==false){
        wrong_code.style.display="block";
    }

}

// Paginate
function pagination(){
    const div = shop_content.childNodes;
    var num=0;
    var reserve=[];
    var divs=[];
    let l=0;
    paginate.innerHTML="";

    div.forEach(elt =>{
        if((elt.style.display=="")||(elt.style.display=="block")){
            reserve.push(elt);
            l++;
            if(l==4){
                divs.push(reserve);
                reserve=[];
                l=0;
            }
            num++;
        }
    });
    divs.push(reserve);
    var number = (num / 4) ;
    console.log(divs);
    for(let i=0;i<number;i++){
        const li = document.createElement("li");
        // if(i==0)li.setAttribute("class","page-item active");
        // else li.setAttribute("class","page-item");
        li.setAttribute("class","page-item");
        li.innerHTML="<a class='page-link' href='#'>"+i+"</a>";
        li.addEventListener("click",(e)=>{
             e.preventDefault();
            shop_content.innerHTML="";
            divs[i].forEach(elt =>{
                shop_content.appendChild(elt);
            });
        });
        if(i==0){
            shop_content.innerHTML="";
            divs[i].forEach(elt =>{
                shop_content.appendChild(elt);
            });            
        }
        paginate.appendChild(li);        
    }
}

// Defautl functions
ourInformation();
putAnotherData();
listCatagorie();
putDatas();
show_menu();
