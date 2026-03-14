const categories=[
"All",
"Programming",
"Music",
"Gaming",
"Travel",
"Education"
];

const FilterButtons = ({setCategory}) => {

return(

<div className="filters">

{categories.map(cat=>(
<button
key={cat}
onClick={()=>setCategory(cat==="All"?"":cat)}
>
{cat}
</button>
))}

</div>

)

}

export default FilterButtons;