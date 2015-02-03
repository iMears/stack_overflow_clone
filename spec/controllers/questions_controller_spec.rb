require 'rails_helper'

describe QuestionsController do
  describe "index" do
    it "does alright" do
      get :index
      expect(response).to be_ok
    end
  end

  # context "#show" do
  #   let(:question) { Question.create title: "Test Title",  content: "This is the question content" }
  #   it "redirects to show path" do
  #     get :show
  #     expect(response).to redirect_to root_path
  #   end
  # end
end
