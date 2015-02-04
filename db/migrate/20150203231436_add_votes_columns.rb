class AddVotesColumns < ActiveRecord::Migration
  def change
    add_column :questions, :votes, :integer
    add_column :answers, :votes, :integer
  end
end
