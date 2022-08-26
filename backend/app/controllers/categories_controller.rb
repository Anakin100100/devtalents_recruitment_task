class CategoriesController < ApplicationController
    before_action :find_category, only: [:show, :update, :destroy]

    def show 
        render status: "200", json: @category
    end

    def create
        begin
            parsed_schema = JSON.parse(params.fetch(:schema, nil))
        rescue => exception
            render status: "400", json: {"message": "unable to parse schema"}
            return
        end

        @category = Category.new(
            parent_category_id: params.fetch(:parent_category_id, nil),
            name: params.fetch(:name, nil),
            schema: params.fetch(:schema, nil)
        )

        if @category.save
            render status: "201", json: @category
        else
            render status: "400", json: {"errors": @category.errors.full_messages}
        end
    end

    def index 
        @categories = Category.all 
        render status: 200, json: @categories
    end

    def update
        if @category.update!(params.permit(:schema, :name, :parent_category_id))
            render status: "200", json: @category
        else 
            render status: "400", json: {"errors": @category.errors.full_messages}
        end
    end

    def destroy
        @category.destroy
        render status: "200", json: {"message": "category deleted"}
    end

    def find_category
        begin
            @category = Category.find(params.fetch(:id, nil))
        rescue
            render status: "400", json: {"message": "category not found"}
            return
        end
    end
end
