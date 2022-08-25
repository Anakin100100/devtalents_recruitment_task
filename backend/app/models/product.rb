class Product < ApplicationRecord
    belongs_to :category
    has_many :category_product_infos
end
