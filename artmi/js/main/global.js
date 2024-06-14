// All declarations
const mission_text = document.getElementById("mission_text");
const mission_title = document.getElementById("mission_title");
const mission_img = document.getElementById("mission_img");
const gallery_text = document.getElementById("gallery_text");
const gallery_title = document.getElementById("gallery_title");
const gallery_img = document.getElementById("gallery_img");
const home = document.getElementById("home");
const checkout = document.getElementById("checkout");

const cart_summary = document.getElementById("cart-summary");
const menu_home = document.getElementById("menu_home");
const menu_shop = document.getElementById("menu_shop");
const menu_cart = document.getElementById("menu_cart");
const menu_checkout = document.getElementById("menu_checkout");

const resume_content = document.getElementById("resume-content");
const div_catagorie = document.getElementById("catagories-menu");
const shop_content = document.getElementById("shop-content");

const sort = document.querySelector("ul.list");
const sortByDate = document.getElementById("sortBydate");

const search_input = document.getElementById("search");

const more_detail = document.querySelector(".single-product-area");
const add_card_btn = document.getElementById("add-cart");
const remove_card_btn = document.getElementById("remove-cart");
const update_card_btn = document.getElementById("update-cart");
const qty = document.getElementById("qty");

const card_list = document.getElementById("cart_list");
const cart_table = document.querySelector(".cart-table-area-shop");
const fav_num = document.querySelectorAll(".fav-num");
const cart_num = document.querySelectorAll(".cart-num");
const show_cart = document.querySelectorAll(".show_cart");
const show_fav = document.querySelectorAll(".show_fav");

const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const subtotal_checkout = document.getElementById("subtotal_checkout");
const total_checkout = document.getElementById("total_checkout");
var chkout = document.getElementById("chkout");

// Promo
const promo_input = document.getElementById("promo-input");
const promo_button = document.getElementById("promo-button");
const promo_apply_button = document.getElementById("promo-apply-button");
const wrong_code = document.getElementById("wrong-code");

// Pagination
const paginate = document.getElementById("paginate");

// Service
async function getData(url) {
    let data = null;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur réseau ou réponse non OK');
        }
        data = await response.json(); // Attendre que la réponse soit convertie en JSON
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
    return data; // Retourne les données
}
