class CategoriesController < ApplicationController
    before_action :find_category, only: [:show, :update, :destroy]

    def show 
        render status: "200", json: @category
    end

    def create
        begin
            @parent_cateogry = Category.find(params.fetch(:parent_category_id, nil))
        rescue 
            render status: "400", json: {"message": "parent category not found"}
            return
        end

        begin
            parsed_schema = JSON.parse(params[:schema])
            parsed_schema.each do |key, value|
                if key == "" || value == ""
                    render status: "400", json: {"message": "none of the fields can be empty"}
                    return 
                end

                if ["DECIMAL", "INTEGER", "BOOLEAN"].include? value 
                    next
                end

                render status: "400", json: {"message": "invalid '#{key}' field value: '#{value}'"}
                return 
            end
        rescue 
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
        begin
            @parent_cateogry = Category.find(params.fetch(:parent_category_id, nil))
        rescue 
            render status: "400", json: {"message": "parent category not found"}
            return
        end

        begin
            parsed_schema = JSON.parse(params[:schema])
            parsed_schema.each do |key, value|
                if key == "" || value == ""
                    render status: "400", json: {"message": "none of the fields can be empty"}
                    return 
                end

                if ["DECIMAL", "INTEGER", "BOOLEAN"].include? value 
                    next
                end

                render status: "400", json: {"message": "invalid '#{key}' field value: '#{value}'"}
                return 
            end
        rescue 
            render status: "400", json: {"message": "unable to parse schema"}
            return
        end


        if @category.update!(params.permit(:schema, :name, :parent_category_id))
            render status: "200", json: @category
        else 
            render status: "400", json: {"errors": @category.errors.full_messages}
        end
    end

    def destroy
        subcategories = []
        new_subcategories = Category.where(parent_category_id: @category.id)
        subcategories << new_subcategories
        iteration = 1

        while true
            new_subcategories = []
            found_any_new_subcategories = false

            subcategories[iteration - 1].each do |subcategory|
                subcategories_for_subcategory = Category.where(parent_category_id: subcategory.id)
                if subcategories_for_subcategory.empty? == true 
                    next
                end

                found_any_new_subcategories = true

                subcategories_for_subcategory.each do |subcategory_for_subcategory|
                    new_subcategories << subcategory_for_subcategory
                end
            end

            if found_any_new_subcategories == false 
                break
            end

            subcategories << new_subcategories
            iteration += 1
        end

        subcategories.each do |subcategories_array|
            subcategories_array.each do |subcategory|
                subcategory.destroy
            end
        end

        @category.destroy
        render status: "200", json: {"message": "category deleted"}
    end

    def get_root_category_id
        render status: "200", json: {"id": Category.where(parent_category_id: nil).first.id}
    end

    def get_sub_categories
        render status: "200", json: Category.where(parent_category_id: params[:id]).all
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
