class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = Note.all
    render json: { notes: @notes }, status: :ok
  end

  def show
  end

  def update
  end

  def create
  end

  def destroy
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end
end
