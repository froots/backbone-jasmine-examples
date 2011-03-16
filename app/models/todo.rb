class Todo < ActiveRecord::Base
  def to_json(options = {})
    super(options.merge(:only => [:id, :title, :description, :created_at, :priority, :position, :done]))
  end
end
