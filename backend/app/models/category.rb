class Category < ApplicationRecord
    has_many :products, dependent: :destroy
    has_many :category_product_infos, dependent: :destroy
end
