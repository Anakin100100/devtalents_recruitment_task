Rails.application.routes.draw do
  resources :category_product_infos
  resources :products
  resources :categories

  get "/get_root_category_id" => "categories#get_root_category_id"
  get "/categories/get_sub_categories/:id" => "categories#get_sub_categories"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
