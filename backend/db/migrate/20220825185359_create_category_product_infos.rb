class CreateCategoryProductInfos < ActiveRecord::Migration[7.0]
  def change
    create_table :category_product_infos do |t|
      t.belongs_to :category, null: false 
      t.belongs_to :product, null: false
      t.json :values, null: false
      t.timestamps
    end
  end
end
