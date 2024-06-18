const livre = document.getElementById("livre");
const modifier = document.getElementById("modifier");
const supprimer = document.getElementById("supprimer");
const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const page = document.getElementById("page");
const commentaire = document.getElementById("commentaire");
const date = document.getElementById("date");
const auteur = document.getElementById("auteur");

const isbn = document.getElementById("isbn");
const etat = document.getElementById("etat");
const editeur = document.getElementById("editeur");
const langue = document.getElementById("langue");
const emplacement = document.getElementById("emplacement");

const dtl = document.getElementById("dtl");
const lst = document.getElementById("lst");
const frm = document.getElementById("frm");
const paginate = document.getElementById("paginate");
const retourner = document.getElementById("retourner");

const btn_add = document.getElementById("add");
const btn_list = document.getElementById("l");
const cat = document.getElementById("ul");
const search = document.getElementById("s");
const s_date = document.getElementById("d");

const input_cat = document.getElementById("c");
const add_cat = document.getElementById("b");

const form_titre = document.querySelector(".form [name='nom']");
const form_auteur = document.querySelector(".form [name='auteur']");
const form_date = document.querySelector(".form [name='date']");
const form_page = document.querySelector(".form [name='page']");
const form_categorie = document.querySelector(".form [name='categorie']");
const form_editeur = document.querySelector(".form [name='editeur']");
const form_etat = document.querySelector(".form [name='etat']");
const form_langue = document.querySelector(".form [name='langue']");
const form_isbn = document.querySelector(".form [name='isbn']");
const form_emplacement = document.querySelector(".form [name='emplacement']");
const form_commentaire = document.querySelector(".form [name='commentaire']");
const submit = document.getElementById("submit");

async function getList(url,nom){
    if((localStorage.getItem(nom)==null)||(localStorage.getItem(nom)=="")){
        let promise = await fetch(url).then(value => value.json());
        console.log("promise");
        localStorage.setItem(nom,JSON.stringify(promise));
        return promise;
    }
    else{
        var data = JSON.parse(localStorage.getItem(nom));
        return data;
    }
}

async function getDatas(url){
        let promise = await fetch(url).then(value => value.json());
        return promise;
}