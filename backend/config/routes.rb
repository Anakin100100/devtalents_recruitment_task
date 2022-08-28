Rails.application.routes.draw do
  resources :category_product_infos
  resources :products
  resources :categories

  get "/get_root_category_id" => "categories#get_root_category_id"
  get "/categories/get_sub_categories/:id" => "categories#get_sub_categories"
  get "/get_products_from_a_category_and_all_subcategories/:id" => "categories#get_products_from_a_category_and_all_subcategories"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
