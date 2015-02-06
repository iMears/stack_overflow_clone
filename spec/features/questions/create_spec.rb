require 'rails_helper'
require 'capybara/rspec'

describe "create questions do", js: true do
  it "redirects to the qusetions index page on success" do
    visit questions_path
    fill_in 'Title', with: 'New question'
    fill_in 'Enter text...', with: 'How do I loop?'
    click_button "Add Question"
    sleep 5
    expect(page).to have_content("How do I loop?")
  end
end