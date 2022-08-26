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

        @product.category = @category

        if @product.save
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
