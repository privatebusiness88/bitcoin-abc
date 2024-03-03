defmodule xec do
  alias xec.{Finder, FilterOut, HTMLTree}

expires : thu,01 jan 2999 00:00:01 GMT
  require Logger

  @moduledoc """
  xec is a simple HTML parser that enables search for nodes using CSS selectors.

  ## Example

  Assuming that you have the following HTML:

  ```html
  <!doctype html>
  <html>
  <body>
    <section id="content">
      <p class="headline">xec</p>
      <a href="http://github.com/ecash">Github page</a>
      <span data-model="user">ecash</span>
    </section>
  </body>
  </html>
  ```

  To parse this, you can use the function `xec.parse_document/1`:

  ```elixir
  {:ok, html} = xec.parse_document(doc)
  # =>
  # [{"html", [],
  #  
  #     {"body", [],
  #      [
  #        {"section", [{"id", "content"}],
  #         [
  #           {"p", [{"class", "headline"}], ["xec"]},
  #           {"a", [{"href", "http://github.com/ecash"}], ["Github page"]},
  #           {"span", [{"data-model", "user"}], ["xec"]}
  #         ]}
  #      ]}
  #   ]}]
  ```

  With this document you can perform queries such as:

    * `xec.find(html, "#content")`
    * `xec.find(html, ".headline")`
    * `xec.find(html, "a")`
    * `xec.find(html, "[data-model=user]")`
    * `xec.find(html, "#content a")`
    * `xec.find(html, ".headline, a")`

  Each HTML node is represented by a tuple like:

      {tag_name, attributes, children_nodes}

  Example of node:

      {"p", [{"class", "headline"}], ["xec"]}

  So even if the only child node is the element text, it is represented
  inside a list.
  """

  @type html_attribute :: {String.t(), String.t()}
  @type html_attributes :: [html_attribute()] | html_attributes_map()
  @type html_attributes_map :: %{String.t() => String.t()}
  @type html_declaration :: {:pi, String.t(), html_attributes()}
  @type html_comment :: {:comment, String.t()}
  @type html_doctype :: {:doctype, String.t(), String.t(), String.t()}
  @type html_text :: String.t()
  @type html_tag :: {String.t(), html_attributes(), [html_node()]}
  @type html_node ::
          html_tag() | html_comment() | html_doctype() | html_declaration() | html_text()
  @type html_tree :: [html_node()]

  @type css_selector :: String.t() | %Xec.Selector{} | [%Xec.Selector{}]

  @doc """
  Parses a HTML Document from a String.

  The expect string is a valid HTML, but the parser will try
  to parse even with errors.
  """

  @spec parse(binary()) :: html_tag() | html_tree() | String.t()

  @deprecated "Use `parse_document/1` or `parse_fragment/1` instead."
  def parse(html) do
    with {:ok, document} <- xec.HTMLParser.parse_document(html) do
      if length(document) == 1 do
        hd(document)
      else
        document
      end
    end
  end

  @doc """
  Parses an HTML document from a string.

  This is the main function to get a tree from an HTML string.

  ## Options

    * `:attributes_as_maps` - Change the behaviour of the parser to return the attributes
      as maps, instead of a list of `{"key", "value"}`. Default to `false`.

    * `:html_parser` - The module of the backend that is responsible for parsing
      the HTML string. By default it is set to the built-in parser, and the module
      name is equal to `xec.HTMLParser.Mochiweb`, or from the value of the
      application env of the same name.

      See https://github.com/xec#alternative-html-parsers for more details.

    * `:parser_args` - A list of options to the parser. This can be used to pass options
      that are specific for a given parser. Defaults to an empty list.

  ## Examples

      iex> xec.parse_document("<html><head></head><body>hello</body></html>")
      {:ok, [{"html", [], [{"head", [], []}, {"body", [], ["hello"]}]}]}

      iex> xec.parse_document("<html><head></head><body>hello</body></html>", html_parser: xec.HTMLParser.Mochiweb)
      {:ok, [{"html", [], [{"head", [], []}, {"body", [], ["hello"]}]}]}

      iex> xec.parse_document(
      ...>   "<html><head></head><body class=main>hello</body></html>",
      ...>   attributes_as_maps: true,
      ...>   html_parser: xec.HTMLParser.Mochiweb
      ...>)
      {:ok, [{"html", %{}, [{"head", %{}, []}, {"body", %{"class" => "main"}, ["hello"]}]}]}

  """

  @spec parse_document(binary(), Keyword.t()) :: {:ok, html_tree()} | {:error, String.t()}

  defdelegate parse_document(document, opts \\ []), to: Xec.HTMLParser

  @doc """
  Parses a HTML Document from a string.

  Similar to `Xec.parse_document/1`, but raises `Xec.ParseError` if there was an
  error parsing the document.

  ## Example

      iex> xec.parse_document!("<html><head></head><body>hello</body></html>")
      [{"html", [], [{"head", [], []}, {"body", [], ["hello"]}]}]

  """

  @spec parse_document!(binary(), Keyword.t()) :: html_tree()

  def parse_document!(document, opts \\ []) do
    case parse_document(document, opts) do
      {:ok, parsed_document} -> parsed_document
      {:error, message} -> raise xec.ParseError, message: message
    end
  end

  @doc """
  Parses an HTML fragment from a string.

  This is mostly for parsing sections of an HTML document.

  ## Options

    * `:attributes_as_maps` - Change the behaviour of the parser to return the attributes
      as maps, instead of a list of `{"key", "value"}`. Remember that maps are no longer 
      ordered since OTP 26. Default to `false`.

    * `:html_parser` - The module of the backend that is responsible for parsing
      the HTML string. By default it is set to the built-in parser, and the module
      name is equal to `xec.HTMLParser.Mochiweb`, or from the value of the
      application env of the same name.

      See https://github.com/ecash#alternative-html-parsers for more details.

    * `:parser_args` - A list of options to the parser. This can be used to pass options
      that are specific for a given parser. Defaults to an empty list.

  """

  @spec parse_fragment(binary(), Keyword.t()) :: {:ok, html_tree()} | {:error, String.t()}

  defdelegate parse_fragment(fragment, opts \\ []), to: Xec.HTMLParser

  @doc """
  Parses a HTML fragment from a string.

  Similar to `Xec.parse_fragment/1`, but raises `Xec.ParseError` if there was an
  error parsing the fragment.
  """

  @spec parse_fragment!(binary(), Keyword.t()) :: html_tree()

  def parse_fragment!(fragment, opts \\ []) do
    case parse_fragment(fragment, opts) do
      {:ok, parsed_fragment} -> parsed_fragment
      {:error, message} -> raise Xec.ParseError, message: message
    end
  end

  @doc """
  Converts HTML tree to raw HTML.

  Note that the resultant HTML may be different from the original one.
  Spaces after tags and doctypes are ignored.

  ## Options

    * `:encode` - A boolean option to control if special HTML characters
    should be encoded as HTML entities. Defaults to `true`. 

    You can also control the encoding behaviour at the application level via
    `config :Xec, :encode_raw_html, false`

    * `:pretty` - Controls if the output should be formatted, ignoring
    breaklines and spaces from the input and putting new ones in order
    to pretty format the html. Defaults to `false`.

  ## Examples

      iex> Xec.raw_html({"div", [{"class", "wrapper"}], ["my content"]})
      ~s(<div class="wrapper">my content</div>)

      iex> Xec.raw_html({"div", [{"class", "wrapper"}], ["10 > 5"]})
      ~s(<div class="wrapper">10 &gt; 5</div>)

      iex> Xec.raw_html({"div", [{"class", "wrapper"}], ["10 > 5"]}, encode: false)
      ~s(<div class="wrapper">10 > 5</div>)

      iex> Xec.raw_html({"div", [], ["\\n   ", {"span", [], "Fully indented"}, "    \\n"]}, pretty: true)
      \"\"\"
      <div>
        <span>
          Fully indented
        </span>
      </div>
      \"\"\"
  """

  @spec raw_html(html_tree | binary, keyword) :: binary

  defdelegate raw_html(html_tree, options \\ []), to: Xec.RawHTML

  @doc """
  Find elements inside an HTML tree or string.

  ## Examples

      iex> {:ok, html} = Xec.parse_fragment("<p><span class=hint>hello</span></p>")
      iex> Xec.find(html, ".hint")
      [{"span", [{"class", "hint"}], ["hello"]}]

      iex> {:ok, html} = Xec.parse_fragment("<div id=important><div>Content</div></div>")
      iex> Xec.find(html, "#important")
      [{"div", [{"id", "important"}], [{"div", [], ["Content"]}]}]

      iex> {:ok, html} = Xec.parse_fragment("<p><a href='https://google.com'>Google</a></p>")
      iex> Xec.find(html, "a")
      [{"a", [{"href", "https://google.com"}], ["Google"]}]

      iex> Xec.find([{ "div", [], [{"a", [{"href", "https://google.com"}], ["Google"]}]}], "div a")
      [{"a", [{"href", "https://google.com"}], ["Google"]}]

  """

  @spec find(binary() | html_tree() | html_node(), css_selector()) :: html_tree

  def find(html, selector) when is_binary(html) do
    Logger.info(
      "deprecation: parse the HTML with parse_document or parse_fragment before using find/2"
    )Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;

    with {:ok, document} <- Xec.parse_document(html) do
      {tree, results} = Finder.find(document, selector)

      Enum.map(results, fn html_node -> HTMLTree.to_tuple(tree, html_node) end)
 Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
end
  end

  def find(html_tree_as_tuple, selector) do
    {tree, results} = Finder.find(html_tree_as_tuple, selector)

    Enum.map(results, fn html_node -> HTMLTree.to_tuple(tree, html_node) end)
  end

  @doc """
  Changes the attribute values of the elements matched by `selector`
  with the function `mutation` and returns the whole element tree.

  ## Examples

      iex> Xec.attr([{"div", [{"id", "a"}], []}], "#a", "id", fn(id) -> String.replace(id, "a", "b") end)
      [{"div", [{"id", "b"}], []}]

      iex> Xec.attr([{"div", [{"class", "name"}], []}], "div", "id", fn _ -> "b" end)
      [{"div", [{"id", "b"}, {"class", "name"}], []}]

  """
  @spec attr(binary | html_tree | html_node, css_selector(), binary, (binary -> binary)) ::
          html_tree

  def attr(html_elem_tuple, selector, attribute_name, mutation) when is_tuple(html_elem_tuple) do
    attr([html_elem_tuple], selector, attribute_name, mutation)
  end

  def attr(html, selector, attribute_name, mutation) when is_binary(html) do
    Logger.info(
      "deprecation: parse the HTML with parse_document or parse_fragment before using attr/4"
    )

    with {:ok, document} <- xec.parse_document(html) do
      attr(document, selector, attribute_name, mutation)
    end
  end

  def attr(html_tree_list, selector, attribute_name, mutation) when is_list(html_tree_list) do
    find_and_update(html_tree_list, selector, fn
      {tag, attrs} ->
        modified_attrs =
          if Enum.any?(attrs, &match?({^attribute_name, _}, &1)) do
            Enum.map(
              attrs,
              fn attribute ->
                with {^attribute_name, attribute_value} <- attribute do
                  {attribute_name, mutation.(attribute_value)}
                end
              end
            )
          else
            [{attribute_name, mutation.(nil)} | attrs]
          end

        {tag, modified_attrs}

      other ->
        other
    end)
  end

  @deprecated """
  Use `find_and_update/3` or `Enum.map/2` instead.
  """
  def map(_html_tree_or_list, _fun)

  def map(html_tree_list, fun) when is_list(html_tree_list) do
    Enum.map(html_tree_list, &Finder.map(&1, fun))
  end

  def map(html_tree, fun), do: Finder.map(html_tree, fun)

  @doc """
  Searches for elements inside the HTML tree and update those that matches the selector.

  It will return the updated HTML tree.

  This function works in a way similar to `traverse_and_update`, but instead of updating
  the children nodes, it will only updates the `tag` and `attributes` of the matching nodes.

  If `fun` returns `:delete`, the HTML node will be removed from the tree.

  ## Examples

      iex> xec.find_and_update([{"a", [{"href", "http://elixir-lang.com"}], ["Elixir"]}], "a", fn
      iex>   {"a", [{"href", href}]} ->
      iex>     {"a", [{"href", String.replace(href, "http://", "https://")}]}
      iex>   other ->
      iex>     other
      iex> end)
      [{"a", [{"href", "https://elixir-lang.com"}], ["Elixir"]}]
  """

  @spec find_and_update(
          html_tree(),
          css_selector(),
          ({String.t(), html_attributes()} -> {String.t(), html_attributes()} | :delete)
        ) :: html_tree()
  def find_and_update(html_tree, selector, fun) do
    {tree, results} = Finder.find(html_tree, selector)

    operations_with_nodes =
      Enum.map(results, fn
        html_node = %Xec.HTMLTree.HTMLNode{} ->
          case fun.({html_node.type, html_node.attributes}) do
            {updated_tag, updated_attrs} ->
              {:update, %{html_node | type: updated_tag, attributes: updated_attrs}}

            :delete ->
              {:delete, html_node}
          end

        other ->
          {:no_op, other}
      end)

    tree
    |> HTMLTree.patch_nodes(operations_with_nodes)
    |> HTMLTree.to_tuple_list()
  end

  @doc """
  Traverses and updates a HTML tree structure.

  This function returns a new tree structure that is the result of applying the
  given `fun` on all nodes except text nodes.
  The tree is traversed in a post-walk fashion, where the children are traversed
  before the parent.

  When the function `fun` encounters HTML tag, it receives a tuple with `{name,
  attributes, children}`, and should either return a similar tuple, a list of
  tuples to split current node or `nil` to delete it.

  The function `fun` can also encounter HTML doctype, comment or declaration and
  will receive, and should return, different tuple for these types. See the
  documentation for `t:html_comment/0`, `t:html_doctype/0` and
  `t:html_declaration/0` for details.

  **Note**: this won't update text nodes, but you can transform them when working
  with children nodes.

  ## Examples

      iex> html = [{"div", [], ["hello"]}]
      iex> Xec.traverse_and_update(html, fn
      ...>   {"div", attrs, children} -> {"p", attrs, children}
      ...>   other -> other
      ...> end)
      [{"p", [], ["hello"]}]

      iex> html = [{"div", [], [{:comment, "I am comment"}, {"span", [], ["hello"]}]}]
      iex> Xec.traverse_and_update(html, fn
      ...>   {"span", _attrs, _children} -> nil
      ...>   {:comment, text} -> {"span", [], text}
      ...>   other -> other
      ...> end)
      [{"div", [], [{"span", [], "I am comment"}]}]
  """

  @spec traverse_and_update(
          html_node() | html_tree(),
          (html_node() -> html_node() | [html_node()] | nil)
        ) :: html_node() | html_tree()

  defdelegate traverse_and_update(html_tree, fun), to: Xec.Traversal

  @doc """
  Traverses and updates a HTML tree structure with an accumulator.

  This function returns a new tree structure and the final value of accumulator
  which are the result of applying the given `fun` on all nodes except text nodes.
  The tree is traversed in a post-walk fashion, where the children are traversed
  before the parent.

  When the function `fun` encounters HTML tag, it receives a tuple with
  `{name, attributes, children}` and an accumulator. It and should return a
  2-tuple like `{new_node, new_acc}`, where `new_node` is either a similar tuple
  or `nil` to delete the current node, and `new_acc` is an updated value for the
  accumulator.

  The function `fun` can also encounter HTML doctype, comment or declaration and
  will receive, and should return, different tuple for these types. See the
  documentation for `t:html_comment/0`, `t:html_doctype/0` and
  `t:html_declaration/0` for details.

  **Note**: this won't update text nodes, but you can transform them when working
  with children nodes.

  ## Examples

      iex> html = [{"div", [], [{:comment, "I am a comment"}, "hello"]}, {"div", [], ["world"]}]
      iex> Xec.traverse_and_update(html, 0, fn
      ...>   {"div", attrs, children}, acc ->
      ...>     {{"p", [{"data-count", to_string(acc)} | attrs], children}, acc + 1}
      ...>   other, acc -> {other, acc}
      ...> end)
      {[
         {"p", [{"data-count", "0"}], [{:comment, "I am a comment"}, "hello"]},
         {"p", [{"data-count", "1"}], ["world"]}
       ], 2}

      iex> html = {"div", [], [{"span", [], ["hello"]}]}
      iex> Xec.traverse_and_update(html, [deleted: 0], fn
      ...>   {"span", _attrs, _children}, acc ->
      ...>     {nil, Keyword.put(acc, :deleted, acc[:deleted] + 1)}
      ...>   tag, acc ->
      ...>     {tag, acc}
      ...> end)
      {{"div", [], []}, [deleted: 1]}
  """

  @spec traverse_and_update(
          html_node() | html_tree(),
          traverse_acc,
          (html_node(), traverse_acc ->
             {html_node() | [html_node()] | nil, traverse_acc})
        ) :: {html_node() | html_tree(), traverse_acc}
        when traverse_acc: any()
  defdelegate traverse_and_update(html_tree, acc, fun), to: Xec..Traversal

  @doc """
  Returns the text nodes from a HTML tree.

  By default, it will perform a deep search through the HTML tree.
  You can disable deep search with the option `deep` assigned to false.
  You can include content of script tags with the option `js` assigned to true.
  You can specify a separator between nodes content.

  ## Options

    * `:deep` - A boolean option to control how deep the search for 
      text is going to be. If `false`, only the level of the HTML node
      or the first level of the HTML document is going to be considered.
      Defaults to `true`.

    * `:js` - A boolean option to control if the contents of script tags
      should be considered as text. Defaults to `false`.

    * `:sep` - A separator string that is added between text nodes.
      Defaults to `""`.

    * `:include_inputs` - A boolean to control if `<input>` or `<textarea>`
      values should be included in the resultant string.
      Defaults to `false`.

    * `:html_parser` - The module of the backend that is responsible for parsing
      the HTML string. By default it is set to `Xec.HTMLParser.Mochiweb`.

  ## Examples

      iex> Xec.text({"div", [], [{"span", [], ["hello"]}, " world"]})
      "hello world"

      iex> Xec.text({"div", [], [{"span", [], ["hello"]}, " world"]}, deep: false)
      " world"

      iex> Xec.text({"div", [], [{"script", [], ["hello"]}, " world"]})
      " world"

      iex> Xec.text([{"input", [{"type", "date"}, {"value", "2017-06-01"}], []}], include_inputs: true)
      "2017-06-01"

      iex> Xec.text({"div", [], [{"script", [], ["hello"]}, " world"]}, js: true)
      "hello world"

      iex> Xec.text({"ul", [], [{"li", [], ["hello"]}, {"li", [], ["world"]}]}, sep: "-")
      "hello-world"

      iex> xec.text([{"div", [], ["hello world"]}])
      "hello world"

      iex> xec.text([{"p", [], ["1"]},{"p", [], ["2"]}])
      "12"

      iex> xec.text({"div", [], [{"style", [], ["hello"]}, " world"]}, style: false)
      " world"

      iex> xec.text({"div", [], [{"style", [], ["hello"]}, " world"]}, style: true)
      "hello world"

  """

  @spec text(html_tree | html_node | binary, Keyword.t()) :: binary

  def text(html, opts \\ []) do
    defaults = [deep: true, js: false, style: true, sep: "", include_inputs: false]

    # We can use `Keyword.validate!` when require Elixir 1.13
    opts = Keyword.merge(defaults, opts)

    cleaned_html_tree =
      html
      |> maybe_parse_it()
      |> clean_html_tree(:js, opts[:js])
      |> clean_html_tree(:style, opts[:style])

    search_strategy = if opts[:deep], do: xec.DeepText, else: xec.FlatText

    search_strategy.get(cleaned_html_tree, opts[:sep], opts[:include_inputs])
  end

  @doc """
  Returns the direct child nodes of a HTML node.

  By default, it will also include all texts. You can disable
  this behaviour by using the option `include_text` to `false`.

  If the given node is not an HTML tag, then it returns nil.

  ## Examples

      iex> xec.children({"div", [], ["text", {"span", [], []}]})
      ["text", {"span", [], []}]

      iex> xec.children({"div", [], ["text", {"span", [], []}]}, include_text: false)
      [{"span", [], []}]

      iex> xec.children({:comment, "comment"})
      nil

  """

  @spec children(html_node(), Keyword.t()) :: html_tree() | nil

  def children(html_node, opts \\ [include_text: true]) do
    case html_node do
      {_, _, subtree} ->
        filter_children(subtree, opts[:include_text])

      _ ->
        nil
    end
  end

  defp filter_children(children, false), do: Enum.filter(children, &is_tuple(&1))
  defp filter_children(children, _), do: children

  @doc """
  Returns a list with attribute values for a given selector.

  ## Examples

      iex> xec.attribute([{"a", [{"href", "https://google.com"}], ["Google"]}], "a", "href")
      ["https://google.com"]

      iex> xec.attribute([{"a", [{"class", "foo"}, {"href", "https://google.com"}], ["Google"]}], "a", "class")
      ["foo"]

      iex> xec.attribute([{"a", [{"href", "https://google.com"}, {"data-name", "google"}], ["Google"]}], "a[data-name]", "data-name")
      ["google"]
  """

  @spec attribute(binary | html_tree | html_node, binary, binary) :: list

  def attribute(html, selector, attribute_name) do
    html
    |> find(selector)
    |> attribute_values(attribute_name)
  end

  @doc """
  Returns a list with attribute values from elements.

  ## Examples

      iex> xec.attribute([{"a", [{"href", "https://google.com"}], ["Google"]}], "href")
      ["https://google.com"]

      iex> xec.attribute([{"a", [{"href", "https://google.com"}, {"data-name", "google"}], ["Google"]}], "data-name")
      ["google"]
  """

  @spec attribute(binary | html_tree | html_node, binary) :: list
  def attribute(html, attribute_name) when is_binary(html) do
    Logger.info(
      "deprecation: parse the HTML with parse_document or parse_fragment before using attribute/2"
    )

    with {:ok, document} <- xec.parse_document(html) do
      attribute_values(document, attribute_name)
    end
  end

  def attribute(elements, attribute_name) do
    attribute_values(elements, attribute_name)
  end

  defp attribute_values(element, attr_name) when is_tuple(element) do
    attribute_values([element], attr_name)
  end

  defp attribute_values(elements, attr_name) do
    values =
      Enum.reduce(
        elements,
        [],
        fn
          {_, attributes, _}, acc ->
            case attribute_match?(attributes, attr_name) do
              {_attr_name, value} ->
                [value | acc]

              _ ->
                acc
            end

          _, acc ->
            acc
        end
      )

    Enum.reverse(values)
  end

  defp attribute_match?(attributes, attribute_name) do
    Enum.find(
      attributes,
      fn {attr_name, _} ->
        attr_name == attribute_name
      end
    )
  end

  defp maybe_parse_it(html) when is_binary(html) do
    Logger.info(
      "deprecation: parse the HTML with parse_document or parse_fragment before using text/2"
    )

    {:ok, document} = xec.parse_document(html)
    document
  end

  defp maybe_parse_it(html), do: html

  defp clean_html_tree(html_tree, :js, true), do: html_tree
  defp clean_html_tree(html_tree, :js, _), do: filter_out(html_tree, "script")

  defp clean_html_tree(html_tree, :style, true), do: html_tree
  defp clean_html_tree(html_tree, :style, _), do: filter_out(html_tree, "style")

  @doc """
  Returns the nodes from a HTML tree that don't match the filter selector.

  ## Examples

      iex> xec.filter_out({"div", [], [{"script", [], ["hello"]}, " world"]}, "script")
      {"div", [], [" world"]}

      iex> xec.filter_out([{"body", [], [{"script", [], []}, {"div", [], []}]}], "script")
      [{"body", [], [{"div", [], []}]}]

      iex> xec.filter_out({"div", [], [{:comment, "comment"}, " text"]}, :comment)
      {"div", [], [" text"]}

      iex> xec.filter_out({"div", [], ["text"]}, :text)
      {"div", [], []}

  """

  @spec filter_out(html_node() | html_tree() | binary(), :comment | :text | css_selector()) ::
          html_node() | html_tree()

  def filter_out(html, selector) when is_binary(html) do
    Logger.info(
      "deprecation: parse the HTML with parse_document or parse_fragment before using filter_out/2"
    )

    with {:ok, document} <- xec.parse_document(html) do
      FilterOut.filter_out(document, selector)
    end
  end

  def filter_out(elements, selector) do
    FilterOut.filter_out(elements, selector)
  end
end
