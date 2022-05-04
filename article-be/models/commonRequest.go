package models

type Pagination struct {
	Page int `json:"page" form:"page" binding:"required"`
	Size int `json:"size" form:"size" binding:"omitempty"`
}
