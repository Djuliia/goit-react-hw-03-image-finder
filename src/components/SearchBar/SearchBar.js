import { SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput, SearchbarStyled } from "./SearchBar.styled"

export const SearchBar = ({onSubmit}) => {
    return (
<SearchbarStyled>
  <SearchForm onSubmit={onSubmit}>
    <SearchFormBtn type="submit">
      <SearchFormBtnLabel className="button-label">Search</SearchFormBtnLabel>
    </SearchFormBtn>

    <SearchFormInput
      className="input"
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos" 
    />
  </SearchForm>
</SearchbarStyled>
    )

}
