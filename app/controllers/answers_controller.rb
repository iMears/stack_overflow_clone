class AnswersController < ApplicationController
  before_action :get_answer, except: [:create, :upvote, :downvote]

  def get_answer
    @answer = Answer.find(params[:id])
  end

  def upvote
    @answer = Answer.find(params[:answer_id])
    @answer.increment!(:votes)

    @question = @answer.question
    render "./questions/show"
  end

  def downvote
    @answer = Answer.find(params[:answer_id])
    @answer.decrement!(:votes)

    @question = @answer.question
    render "./questions/show"
  end

  def create
    @question = Question.find(params[:question_id])
    @answer = @question.answers.create(answer_params)

    # @answer = Answer.new(title: answer_params[:answer][:title],
    #                      question_id: answer_params[:question_id],
    #                      content: answer_params[:answer][:content])

    # @answer.save
    redirect_to @answer.question  #Still weird
  end

  def show
    # @answer = Answer.find(params[:id])
  end

  def edit
    # @answer = Answer.find(params[:id])
  end

  def update
    # @answer = Answer.find(params[:id])

    if @answer.update(answer_params)
      redirect_to @question
    else
      render 'edit'
    end
  end

  def destroy
    # @answer = Answer.find(params[:id])
    @answer.destroy
    redirect_to root_path
  end

  private

  def answer_params
    params.require(:answer).permit(:title, :content)
  end
end
