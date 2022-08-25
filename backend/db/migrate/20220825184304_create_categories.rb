class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.integer :parent_category_id
      t.string :name, null: false, index: { unique: true, name: 'unique_category_name' }
      t.json :schema, null: false
      t.timestamps
    end
  end
end
