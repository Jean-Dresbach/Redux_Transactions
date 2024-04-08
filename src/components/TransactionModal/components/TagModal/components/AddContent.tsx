/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  ChangeEvent,
  MutableRefObject,
  FormEvent,
  Dispatch
} from "react"
import { Box, Button, Popover, TextField } from "@mui/material"
import TagIcon from "@mui/icons-material/SellRounded"
import data, { Skin } from "@emoji-mart/data"
import { Picker } from "emoji-mart"
import { useAppDispatch, useAppSelector, addTag } from "../../../../../redux"
import { addTagDTO } from "../../../../../types/tag"
import { Transaction } from "../../../../../types/transaction"

interface AddContentProps {
  type: "Entrada" | "Saída"
  toggleModalOpen: () => void
  setData: Dispatch<React.SetStateAction<Transaction>>
}

const EmojiPicker = (props: Picker | Readonly<Picker> | any) => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>

  useEffect(() => {
    new Picker({ ...props, data, ref })
  }, [props])

  return <div className="emoji-picker-container" ref={ref} />
}

export function AddContent({
  type,
  setData,
  toggleModalOpen
}: AddContentProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null)
  const [chosenTag, setChosenTag] = useState<string>("")
  const [tagName, setTagName] = useState<string>("")
  const [tagNameError, setTagNameError] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const theme = useAppSelector((state) => state.theme)
  const tags = useAppSelector((state) => state.tags)
  const dispatch = useAppDispatch()
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const handleFormValidation = () => {
      if (tagName === "" || chosenTag === "" || tagNameError) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }

    handleFormValidation()
  }, [chosenTag, tagName, tagNameError])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value
    inputValue = inputValue.replace(
      /[^\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu,
      ""
    )
    setChosenTag(inputValue)
  }

  const handleTagNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setTagName(newName)

    const test1 = tags.entrys.map(
      (t) =>
        t.name.toLocaleLowerCase().trim() === newName.toLocaleLowerCase().trim()
    )
    const test2 = tags.outs.map(
      (t) =>
        t.name.toLocaleLowerCase().trim() === newName.toLocaleLowerCase().trim()
    )

    if (test1.includes(true) || test2.includes(true)) {
      return setTagNameError(true)
    }

    setTagNameError(false)
  }

  const handleHelperTextContent = () => {
    if (tagName !== "" && !tagNameError) {
      return "Nome disponível"
    } else if (tagNameError) {
      return "Nome já em uso"
    } else {
      return "O nome deve ser único"
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newTag: addTagDTO = {
      transactionType: type,
      tag: { name: tagName, emoji: chosenTag }
    }

    dispatch(addTag(newTag))
    setData((prevState) => ({
      ...prevState,
      tag: { name: tagName, emoji: chosenTag }
    }))
    toggleModalOpen()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
      }}
    >
      <TextField
        label={<TagIcon />}
        aria-describedby={id}
        onClick={handleClick}
        onChange={handleTagInputChange}
        value={chosenTag}
        InputLabelProps={{ shrink: chosenTag !== "" }}
        sx={{ width: "100%", maxWidth: "250px" }}
      />
      <TextField
        onChange={handleTagNameInputChange}
        value={tagName}
        error={tagNameError}
        label="Nome"
        helperText={handleHelperTextContent()}
        inputProps={{ maxLength: 20 }}
        sx={{ width: "100%", maxWidth: "250px" }}
      />

      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        sx={{ width: "100%", maxWidth: "250px" }}
      >
        Confirmar
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <EmojiPicker
          locale="pt"
          theme={theme}
          data={data}
          onEmojiSelect={(emojiData: Skin) => {
            setChosenTag(emojiData.native)
            handleClose()
          }}
        />
      </Popover>
    </Box>
  )
}
