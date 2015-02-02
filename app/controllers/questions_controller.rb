class QuestionsController < ApplicationController
  def index
    @questions = Question.all
  end

  def create
    @question = Question.new(params[:question])

    @question.save
    redirect_to @question
  end

  def show
    @question = Question.find(params[:id])
  end
end
