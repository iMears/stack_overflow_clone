class QuestionsController < ApplicationController

  before_action :get_question, except: [:index, :create, :upvote, :downvote]

  def get_question
    @question = Question.find(params[:id])
  end

  def upvote
    @question = Question.find(params[:question_id])
    @question.increment!(:votes)

    redirect_to questions_path
  end

  def downvote
    @question = Question.find(params[:question_id])
    @question.decrement!(:votes)

    redirect_to questions_path
  end

  def index
    @api_response = HTTParty.get("https://api.github.com/zen",
            :headers => { "Authorization" => 'token ' + ENV['GITHUB_TOKEN'], 'User-Agent' => 'xyz'})
    @questions = Question.all.order(:created_at)
  end

  def create
    @question = Question.new(question_params)
    @question.save
    render json: @question
    # redirect_to @question
  end

  def show
  end

  def edit
  end

  def update
    if @question.update(question_params)
      redirect_to @question
    else
      render 'edit'
    end
  end

  def destroy
    @question.destroy
    redirect_to questions_path
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :id, :votes)
  end
end
