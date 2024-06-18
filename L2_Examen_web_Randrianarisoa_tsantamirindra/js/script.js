// List catégorie

//localStorage.clear();

async function categorie_list(){
    cat.innerHTML="";
    form_categorie.innerHTML="";
    var dt=await getList("../json/categ.json","categ");


    for(let i=0;i<dt.length;i++){
        const li = document.createElement("li");
        
/*
        pour mettre a jours les categories
        const button1 = document.createElement("button");
        button1.innerHTML="Mod";

        const button2 = document.createElement("button");
        button2.innerHTML="Suppr";
*/
        const option = document.createElement("option");
        option.innerHTML=dt[i];
        console.log(dt[i]);
        
        li.innerHTML=dt[i];

/*
        button1.addEventListener("click",()=>{
            input_cat.value=dt[i];
            b.innerHTML="Modifier";
            b.addEventListener("click",()=>{
                dt[i]=input_cat.value;
                localStorage.setItem("categ",JSON.stringify(dt));
                categorie_list();    
                input_cat.value="";        
            });
        });
        button2.addEventListener("click",()=>{
            dt.pop(dt[i]);
            localStorage.setItem("categ",JSON.stringify(dt));
            categorie_list();            
            input_cat.value="";
        });
*/
        li.addEventListener("click",()=>{
            filter("categorie",dt[i]);
        });
        form_categorie.appendChild(option);
        cat.appendChild(li);
//        cat.appendChild(button1);
//        cat.appendChild(button2);
    }
}

// Filter
async function filter(type,nom){
    paginate.style.display="none";
    var datas = await getList("../json/datas.json","datas");
    livre.innerHTML="";
    if(type!="All"){
        datas.forEach(elt => {
            if(elt[type]==nom){
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.setAttribute("src",elt["img"]);
                const figcaption = document.createElement("figcaption");
                figcaption.innerHTML="<p>"+elt.nom+"</p>";
                const btn = document.createElement("button");
                btn.innerHTML="Detail";
        
                btn.addEventListener("click",()=>{
                    titre.innerHTML=elt.nom;
                    auteur.innerHTML=elt.auteur;
                    categorie.innerHTML=elt.categorie;
                    page.innerHTML=elt.page;
                    date.innerHTML=elt.date;
                    commentaire.innerHTML=elt.commentaire;
                    isbn.innerHTML = elt.isbn;
                    editeur.innerHTML = elt.editeur;
                    etat.innerHTML = elt.etat;
                    langue.innerHTML = elt.langue;
                    emplacement.innerHTML = elt.emplacement;
            

                    lst.style.display="none";
                    dtl.style.display="flex";
                    supprimer.addEventListener("click",()=>{
                        datas.pop(elt);
                        localStorage.setItem("datas",JSON.stringify(datas));
                        pagination();
                        lst.style.display="flex";
                        dtl.style.display="none";
                        frm.style.display="none";
                    });
                    modifier.addEventListener("click",()=>{
                        form_titre.value = elt.nom;
                        form_auteur.value = elt.auteur;
                        form_categorie.value = elt.categorie;
                        form_page.value = elt.page;
                        form_date.value = elt.date;

                        form_editeur.value = elt.editeur;
                        form_etat.value = elt.etat;
                        form_langue.value = elt.langue;
                        form_isbn.value = elt.isbn;
                        form_emplacement.value = elt.emplacement;
                        form_commentaire.value = elt.commentaire;
                        
                        submit.value="Modifier";

                        frm.addEventListener("submit",async (e)=>{
                            e.preventDefault();
                            elt.nom = form_titre.value;
                            elt.auteur = form_auteur.value;
                            elt.categorie = form_categorie.value;
                            elt.page = form_page.value;
                            elt.date = form_date.value;
                            elt.commentaire = form_commentaire.value;
                            elt.isbn = form_isbn.value;
                            elt.editeur = form_editeur.value;
                            elt.etat = form_etat.value;
                            elt.langue = form_langue.value;
                            elt.emplacement =  form_emplacement.value;
        
                            localStorage.setItem("datas",JSON.stringify(datas));
                            
                            pagination();
                            lst.style.display="flex";
                            dtl.style.display="none";
                            frm.style.display="none";    
                        });

                        frm.style.display="flex";
                        lst.style.display="none";
                        dtl.style.display="none";
                    });
                });
                figcaption.appendChild(btn);
                figure.appendChild(img);
                figure.appendChild(figcaption);
                livre.appendChild(figure);                    
            }
        });
    }
    else if(type=="All"){
        var bool=false;
        datas.forEach(elt => {
// Tester s'il y en a

        for(let i in elt){

            if(elt[i].includes(nom)){
                bool=true;
                    break;
                }
            }
            if(bool==true){
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.setAttribute("src",elt["img"]);
                const figcaption = document.createElement("figcaption");
                figcaption.innerHTML="<p>"+elt.nom+"</p>";
                const btn = document.createElement("button");
                btn.innerHTML="Detail";
        
                btn.addEventListener("click",()=>{
                    console.log("test");
                    titre.innerHTML=elt.nom;
                    auteur.innerHTML=elt.auteur;
                    categorie.innerHTML=elt.categorie;
                    page.innerHTML=elt.page;
                    date.innerHTML=elt.date;
                    commentaire.innerHTML=elt.commentaire;
                    lst.style.display="none";
                    dtl.style.display="flex";
                    supprimer.addEventListener("click",()=>{
                        datas.pop(elt);
                        localStorage.setItem("datas",JSON.stringify(datas));
                        pagination();
                        lst.style.display="flex";
                        dtl.style.display="none";
                        frm.style.display="none";
                    });
                    modifier.addEventListener("click",()=>{
                        form_titre.value = elt.nom;
                        form_auteur.value = elt.auteur;
                        form_categorie.value = elt.categorie;
                        form_page.value = elt.page;
                        form_date.value = elt.date;
        
                        form_editeur.value = elt.editeur;
                        form_etat.value = elt.etat;
                        form_langue.value = elt.langue;
                        form_isbn.value = elt.isbn;
                        form_emplacement.value = elt.emplacement;
                        form_commentaire.value = elt.commentaire;
                        submit.value="Modifier";
        
                        frm.addEventListener("submit",async (e)=>{
                            e.preventDefault();
        //                    console.log("teto izy");
                            elt.nom = form_titre.value;
                            elt.auteur = form_auteur.value;
                            elt.categorie = form_categorie.value;
                            elt.page = form_page.value;
                            elt.date = form_date.value;
                            elt.commentaire = form_commentaire.value;
                            elt.isbn = form_isbn.value;
                            elt.editeur = form_editeur.value;
                            elt.etat = form_etat.value;
                            elt.langue = form_langue.value;
                            elt.emplacement =  form_emplacement.value;
        
                            localStorage.setItem("datas",JSON.stringify(datas));
                            
                            pagination();
                            lst.style.display="flex";
                            dtl.style.display="none";
                            frm.style.display="none";    
                        });
                    });
                });
                figcaption.appendChild(btn);
                figure.appendChild(img);
                figure.appendChild(figcaption);
                livre.appendChild(figure);
                   
            }
         });        
    }
}


// Afficher lest datas / Modifier /Supprimer/DETAILS
async function putDatas(){
    var datas = await getList("../json/datas.json","datas");
    livre.innerHTML="";
    datas.forEach(elt => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.setAttribute("src",elt["img"]);
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML="<p>"+elt.nom+"</p>";
        const btn = document.createElement("button");
        btn.innerHTML="Detail";

        btn.addEventListener("click",()=>{
            titre.innerHTML=elt.nom;
            auteur.innerHTML=elt.auteur;
            categorie.innerHTML=elt.categorie;
            page.innerHTML=elt.page;
            date.innerHTML=elt.date;
            commentaire.innerHTML=elt.commentaire;
            isbn.innerHTML = elt.isbn;
            editeur.innerHTML = elt.editeur;
            etat.innerHTML = elt.etat;
            langue.innerHTML = elt.langue;
            emplacement.innerHTML = elt.emplacement;
    

            lst.style.display="none";
            dtl.style.display="flex";
            supprimer.addEventListener("click",()=>{
                datas.pop(elt);
                localStorage.setItem("datas",JSON.stringify(datas));
                pagination();
                lst.style.display="flex";
                dtl.style.display="none";
                frm.style.display="none";
            });
            modifier.addEventListener("click",()=>{
                form_titre.value = elt.nom;
                form_auteur.value = elt.auteur;
                form_categorie.value = elt.categorie;
                form_page.value = elt.page;
                form_date.value = elt.date;

                form_editeur.value = elt.editeur;
                form_etat.value = elt.etat;
                form_langue.value = elt.langue;
                form_isbn.value = elt.isbn;
                form_emplacement.value = elt.emplacement;
                form_commentaire.value = elt.commentaire;
                submit.value="Modifier";

                frm.addEventListener("submit",async (e)=>{
                    e.preventDefault();
//                    console.log("teto izy");
                    elt.nom = form_titre.value;
                    elt.auteur = form_auteur.value;
                    elt.categorie = form_categorie.value;
                    elt.page = form_page.value;
                    elt.date = form_date.value;
                    elt.commentaire = form_commentaire.value;
                    elt.isbn = form_isbn.value;
                    elt.editeur = form_editeur.value;
                    elt.etat = form_etat.value;
                    elt.langue = form_langue.value;
                    elt.emplacement =  form_emplacement.value;

                    localStorage.setItem("datas",JSON.stringify(datas));
                    
                    pagination();
                    lst.style.display="flex";
                    dtl.style.display="none";
                    frm.style.display="none";    
                });

                frm.style.display="flex";
                lst.style.display="none";
                dtl.style.display="none";
            });
        });
        figcaption.appendChild(btn);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        livre.appendChild(figure);
    });
}

retourner.addEventListener("click",()=>{
    lst.style.display="flex";
    dtl.style.display="none";
    frm.style.display="none";
});

// Ajout categ
add_cat.addEventListener("click",async ()=>{
    var dt=await getList("../json/categ.json","categ");
    let c = input_cat.value;
    dt.push(c);
    console.log(dt);
    localStorage.setItem("categ",JSON.stringify(dt));
    categorie_list();
    input_cat.value="";
});

// mENU
btn_list.addEventListener("click",()=>{
    lst.style.display="flex";
    dtl.style.display="none";
    frm.style.display="none";
});

btn_add.addEventListener("click",()=>{
    
    form_titre.value = "";
    form_auteur.value = "";
    form_categorie.value = "";
    form_page.value = "";
    form_date.value = "";

    form_editeur.value = "";
    form_etat.value = "";
    form_langue.value = "";
    form_isbn.value = "";
    form_emplacement.value = "";
    submit.value="Ajouter";

    frm.addEventListener("submit",async (e)=>{
        e.preventDefault();
        var datas = await getList("../json/datas.json","datas");
        var elt={
            "nom" : form_titre.value,
            "auteur" : form_auteur.value,
            "elt.categorie" :form_categorie.value,
            "page" : form_page.value,
            "date" : form_date.value,
            "commentaire" : form_commentaire.value,
            "isbn" : form_isbn.value,
            "editeur" : form_editeur.value,
            "etat" : form_etat.value,
            "langue" : form_langue.value,
            "emplacement" : form_emplacement.value
        }; 
        
        datas.push(elt);

        localStorage.setItem("datas",JSON.stringify(datas));
        pagination();
        lst.style.display="flex";
        dtl.style.display="none";
        frm.style.display="none";    

    });

    lst.style.display="none";
    dtl.style.display="none";
    frm.style.display="flex";    
});

// Recherche
search.addEventListener("input",()=>{
    filter("All",search.value);
});

s_date.addEventListener("input",()=>{
    console.log(s_date.value);
    filter("date",s_date.value);

});

// Pagination

async function pagination(){
    var dt = await getList("../json/datas.json","datas");
    var les_datas=[];
    var tmp=[];
    let l=0;

    livre.innerHTML="";

    var number = dt.length / 4;

    dt.forEach(elt=>{
        tmp.push(elt);

        if(l==4){
            les_datas.push(tmp);
            l=0;
            tmp=[];
        }
        l++;
    });

    les_datas.push(tmp);
    paginate.innerHTML="";

    les_datas[0].forEach(elt=>{
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.setAttribute("src",elt["img"]);
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML="<p>"+elt.nom+"</p>";
        const btn = document.createElement("button");
        btn.innerHTML="Detail";
    
        btn.addEventListener("click",()=>{
            titre.innerHTML=elt.nom;
            auteur.innerHTML=elt.auteur;
            categorie.innerHTML=elt.categorie;
            page.innerHTML=elt.page;
            date.innerHTML=elt.date;
            commentaire.innerHTML=elt.commentaire;
            isbn.innerHTML = elt.isbn;
            editeur.innerHTML = elt.editeur;
            etat.innerHTML = elt.etat;
            langue.innerHTML = elt.langue;
            emplacement.innerHTML = elt.emplacement;
    
    
            lst.style.display="none";
            dtl.style.display="flex";
            supprimer.addEventListener("click",()=>{
                datas.pop(elt);
                localStorage.setItem("datas",JSON.stringify(datas));
                putDatas();
                lst.style.display="flex";
                dtl.style.display="none";
                frm.style.display="none";
            });
            modifier.addEventListener("click",()=>{
                form_titre.value = elt.nom;
                form_auteur.value = elt.auteur;
                form_categorie.value = elt.categorie;
                form_page.value = elt.page;
                form_date.value = elt.date;
    
                form_editeur.value = elt.editeur;
                form_etat.value = elt.etat;
                form_langue.value = elt.langue;
                form_isbn.value = elt.isbn;
                form_emplacement.value = elt.emplacement;
                form_commentaire.value = elt.commentaire;
                submit.value="Modifier";
    
                frm.addEventListener("submit",async (e)=>{
                    e.preventDefault();
    //                    console.log("teto izy");
                    elt.nom = form_titre.value;
                    elt.auteur = form_auteur.value;
                    elt.categorie = form_categorie.value;
                    elt.page = form_page.value;
                    elt.date = form_date.value;
                    elt.commentaire = form_commentaire.value;
                    elt.isbn = form_isbn.value;
                    elt.editeur = form_editeur.value;
                    elt.etat = form_etat.value;
                    elt.langue = form_langue.value;
                    elt.emplacement =  form_emplacement.value;
    
                    localStorage.setItem("datas",JSON.stringify(datas));
                    
                    putDatas();
                    lst.style.display="flex";
                    dtl.style.display="none";
                    frm.style.display="none";    
                });
    
                frm.style.display="flex";
                lst.style.display="none";
                dtl.style.display="none";
            });
        });
        figcaption.appendChild(btn);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        livre.appendChild(figure);
    }); 


    for(let i=1;i<=number;i++){
        const li = document.createElement("li");
        li.innerHTML=i;
        paginate.appendChild(li);
        li.addEventListener("click",()=>{
            livre.innerHTML="";
            les_datas[i].forEach(elt => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.setAttribute("src",elt["img"]);
                const figcaption = document.createElement("figcaption");
                figcaption.innerHTML="<p>"+elt.nom+"</p>";
                const btn = document.createElement("button");
                btn.innerHTML="Detail";
        
                btn.addEventListener("click",()=>{
                    titre.innerHTML=elt.nom;
                    auteur.innerHTML=elt.auteur;
                    categorie.innerHTML=elt.categorie;
                    page.innerHTML=elt.page;
                    date.innerHTML=elt.date;
                    commentaire.innerHTML=elt.commentaire;
                    isbn.innerHTML = elt.isbn;
                    editeur.innerHTML = elt.editeur;
                    etat.innerHTML = elt.etat;
                    langue.innerHTML = elt.langue;
                    emplacement.innerHTML = elt.emplacement;
            
        
                    lst.style.display="none";
                    dtl.style.display="flex";
                    supprimer.addEventListener("click",()=>{
                        datas.pop(elt);
                        localStorage.setItem("datas",JSON.stringify(datas));
                        pagination();
                        lst.style.display="flex";
                        dtl.style.display="none";
                        frm.style.display="none";
                    });
                    modifier.addEventListener("click",()=>{
                        form_titre.value = elt.nom;
                        form_auteur.value = elt.auteur;
                        form_categorie.value = elt.categorie;
                        form_page.value = elt.page;
                        form_date.value = elt.date;
        
                        form_editeur.value = elt.editeur;
                        form_etat.value = elt.etat;
                        form_langue.value = elt.langue;
                        form_isbn.value = elt.isbn;
                        form_emplacement.value = elt.emplacement;
                        form_commentaire.value = elt.commentaire;
                        submit.value="Modifier";
        
                        frm.addEventListener("submit",async (e)=>{
                            e.preventDefault();
        //                    console.log("teto izy");
                            elt.nom = form_titre.value;
                            elt.auteur = form_auteur.value;
                            elt.categorie = form_categorie.value;
                            elt.page = form_page.value;
                            elt.date = form_date.value;
                            elt.commentaire = form_commentaire.value;
                            elt.isbn = form_isbn.value;
                            elt.editeur = form_editeur.value;
                            elt.etat = form_etat.value;
                            elt.langue = form_langue.value;
                            elt.emplacement =  form_emplacement.value;
        
                            localStorage.setItem("datas",JSON.stringify(datas));
                            
                            pagination();
                            lst.style.display="flex";
                            dtl.style.display="none";
                            frm.style.display="none";    
                        });
        
                        frm.style.display="flex";
                        lst.style.display="none";
                        dtl.style.display="none";
                    });
                });
                figcaption.appendChild(btn);
                figure.appendChild(img);
                figure.appendChild(figcaption);
                livre.appendChild(figure);
            });
        });
    }    
}

categorie_list();
//putDatas();
pagination();
input_cat.value="";