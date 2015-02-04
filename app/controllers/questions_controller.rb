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
    # GITHUB_TOKEN = ENV['GITHUB_TOKEN']
    # GITHUB_USER =
    @api_response = HTTParty.get("https://api.github.com/zen",
            :headers => { "Authorization" => 'token ' + ENV['GITHUB_TOKEN'], 'User-Agent' => 'xyz'})
    # @github_user = JSON.parse(@api_response.body);
    @questions = Question.all.order(:created_at)
  end

  def create
    @question = Question.new(question_params)

    @question.save
    redirect_to @question
  end

  def show
    # @question = Question.find(params[:id])
  end

  def edit
    # @question = Question.find(params[:id])
  end

  def update
    # @question = Question.find(params[:id])

    if @question.update(question_params)
      redirect_to @question
    else
      render 'edit'
    end
  end

  def destroy
    # @question = Question.find(params[:id])
    @question.destroy
    redirect_to questions_path
  end

  private

  def question_params
    params.require(:question).permit(:title, :content, :id, :votes)
  end
end
