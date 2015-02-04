class AnswersController < ApplicationController
  # before_filter :get_answer, except: :create

  # def get_answer
  #   @answer = Answer.find(params[:id])
  # end

  def create
    @answer = Answer.new(title: answer_params[:answer][:title], question_id: answer_params[:question_id], content: answer_params[:answer][:content])

    @answer.save
    redirect_to @answer.question  #Still weird
  end

  def show
    @answer = Answer.find(params[:id])
  end

  def edit
    @answer = Answer.find(params[:id])
  end

  def update
    @answer = Answer.find(params[:id])

    if @answer.update(answer_par)
      redirect_to @question
    else
      render 'edit'
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy
    redirect_to @question
  end

  private

  def answer_params
    params.permit(:question_id, answer: [:title, :content])
  end
end
