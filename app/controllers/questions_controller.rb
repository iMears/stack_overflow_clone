class QuestionsController < ApplicationController
  # before do
  #   :find_question
  # end

  # def find_question
  #   @question = Question.find(params[:id])
  # end

  def index
    @questions = Question.all
  end

  def create
    @question = Question.new(question_params)

    @question.save
    redirect_to @question
  end

  def show
    @question = Question.find(params[:id])
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(params[:id])

    if @question.update(question_params)
      redirect_to @question
    else
      render 'edit'
    end
  end

  def destroy
    p "Made it in the destroy route"
    @question = Question.find(params[:id])
    @question.destroy
    redirect_to questions_path
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :id, :votes)
  end
end
