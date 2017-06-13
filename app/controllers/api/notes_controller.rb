module Api
  class NotesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_note, only: [:show, :update, :destroy]

    def index
      @notes = Note.where(user: current_user)
      render json: { notes: @notes }, status: :ok
    end

    def show
      if @note.user != current_user
        render json: { success: false, errors: ['You don\'t have the note'] }, status: :not_found
        return
      end
      render json: { note: @note }, status: :ok
    end

    def update
      if @note.user != current_user
        render json: { success: false, errors: ['You don\'t have the note'] }, status: :not_found
        return
      end
      if @note.update(note_params)
        head :no_content
        return
      end
      render json: @note.errors, status: :unprocessable_entity
    end

    def create
      @note = Note.new(note_params)
      @note.user = current_user
      if @note.save
        render json: { note: @note }, status: :created
        return
      end
      render json: { errors: @note.errors }, status: :unprocessable_entity
    end

    def destroy
    end

    private

    def set_note
      @note = Note.find(params[:id])
    end

    def note_params
      params.require(:note).permit(:title, :content)
    end
  end
end
