class ProductsController < ApplicationController
    before_action :find_product, only: [:show, :update, :destroy]

    def show 
        render status: "200", json: @product
    end

    def create 
        @product = Product.new(
            name: params.fetch(:name, nil)
        )
        begin
            @category = Category.find(params.fetch(:category_id, nil))
        rescue
            render status: "400", json: {"message": "category not found"}
            return
        end

        category_tree = [@category]
        category_tree << Category.find(@category.parent_category_id) #each created category has at least one parent category
        iteration = 1
        while true
            if category_tree[iteration].parent_category_id.nil? == true 
                break
            end
            category_tree << Category.find(category_tree[iteration].parent_category_id)
            iteration += 1
        end

        @product.category = @category

        if @product.save
            category_tree.each do |category|
                values = {}
                parsed_schema = JSON.parse(category.schema)
                parsed_schema.each do |key, value|
                    if value == "BOOLEAN"
                        values[key] = false
                    end
                    if value == "DECIMAL"
                        values[key] = 0.0
                    end
                    if value == "INTEGER"
                        values[key] = 0
                    end
                end

                CategoryProductInfo.create(
                    category_id: category.id,
                    product_id: @product.id,
                    values: values.to_json
                )
            end
            render status: "201", json: @product
        else
            render status: "400", json: {"errors": @product.errors.full_messages}
        end
    end

    def index 
        @products = Product.all 
        render status: 200, json: @products
    end

    def update
        begin
            @category = Category.find(params.fetch(:category_id, nil))
        rescue
            render status: "400", json: {"message": "category not found"}
            return
        end

        if @product.category.id != @category.id 
            render status: "400", json: {"message": "cannot mutate category id, if you want to change this recreate the product"}
            return
        end

        if @product.update!(params.permit(:name))
            render status: "200", json: @product
        else 
            render status: "400", json: {"errors": @product.errors.full_messages}
        end
    end

    def destroy
        @product.destroy
        render status: "200", json: {"message": "product deleted"}
    end

    def find_product
        begin
            @product = Product.find(params.fetch(:id, nil))
        rescue
            render status: "400", json: {"message": "product not found"}
            return
        end
    end
end
