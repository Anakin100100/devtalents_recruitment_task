class CategoryProductInfosController < ApplicationController
    before_action :find_category_product_info, only: [:show, :update, :destroy]

    def show 
        render status: "200", json: @category_product_info
    end

    def create 
        validate_values_are_parsable()

        begin
            @category = Category.find(params.fetch(:category_id, nil))
        rescue
            render status: "400", json: {"message": "category not found"}
            return
        end

        begin
            @product = Product.find(params.fetch(:product_id, nil))
        rescue
            render status: "400", json: {"message": "product not found"}
            return
        end

        @category_product_info = CategoryProductInfo.new(
            values: params.fetch(:values)
        )

        @category_product_info.category = @category
        @category_product_info.product = @product

        if @category_product_info.save
            render status: "201", json: @category_product_info
        else
            render status: "400", json: {"errors": @category_product_info.errors.full_messages}
        end
    end 

    def index 
        @category_product_infos = CategoryProductInfo.all 
        render status: 200, json: @category_product_infos
    end

    def update
        validate_values_are_parsable()

        if @category_product_info.update!(params.permit(:values))
            render status: "200", json: @category_product_info
        else 
            render status: "400", json: {"errors": @category_product_info.errors.full_messages}
        end
    end

    def destroy
        @category_product_info.destroy
        render status: "200", json: {"message": "category product info deleted"}
    end

    def find_category_product_info
        begin
            @category_product_info = CategoryProductInfo.find(params.fetch(:id, nil))
        rescue
            render status: "400", json: {"message": "category product info not found"}
            return
        end
    end

    def validate_values_are_parsable
        begin
            parsed_values = JSON.parse(params.fetch(:values, nil))
        rescue => exception
            render status: "400", json: {"message": "unable to parse values"}
            return
        end
    end
end
