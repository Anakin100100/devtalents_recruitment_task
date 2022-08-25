class Category < ApplicationRecord
    has_many :products
    has_many :category_product_infos
end
