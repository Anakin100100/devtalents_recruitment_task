class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.belongs_to :category, null: false 
      t.string :name, null: false, index: { unique: true, name: 'unique_product_name' }
      t.timestamps
    end
  end
end
