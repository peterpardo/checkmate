import { useRef, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import TextInput from "../../../../Components/Inputs/TextInput";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

/**
 * Renders the email step of the login process which includes an email field.
 *
 * @param {Object} props
 * @param {Object} props.form - Form state object.
 * @param {Object} props.errors - Object containing form validation errors.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @param {Function} props.onChange - Callback function to handle form input changes.
 * @param {Function} props.onBack - Callback function to handle "Back" button click.
 * @returns {JSX.Element}
 */
const EmailStep = ({ form, errors, onSubmit, onChange }) => {
	const theme = useTheme();
	const inputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleNavigate = () => {
		if (form.email !== "" && !errors.email) {
			sessionStorage.setItem("email", form.email);
		}
		navigate("/forgot-password");
	};

	return (
		<>
			<Stack
				gap={{ xs: theme.spacing(12), sm: theme.spacing(16) }}
				textAlign="center"
				position="relative"
			>
				<Box>
					<Typography component="h1">Log In</Typography>
					<Typography>Enter your email address</Typography>
				</Box>
				<Box
					textAlign="left"
					component="form"
					noValidate
					spellCheck={false}
					onSubmit={onSubmit}
					display="grid"
					gap={{ xs: theme.spacing(12), sm: theme.spacing(16) }}
				>
					<TextInput
						type="email"
						id="login-email-input"
						label="Email"
						isRequired={true}
						placeholder="jordan.ellis@domain.com"
						autoComplete="email"
						value={form.email}
						onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
						onChange={onChange}
						error={errors.email ? true : false}
						helperText={errors.email}
						ref={inputRef}
					/>
					<Stack
						direction="row"
						justifyContent="flex-end"
					>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={errors.email && true}
							sx={{
								width: "30%",
								"&.Mui-focusVisible": {
									outline: `2px solid ${theme.palette.primary.main}`,
									outlineOffset: `2px`,
									boxShadow: `none`,
								},
							}}
						>
							Continue
						</Button>
					</Stack>
				</Box>
				<Box
					textAlign="center"
					sx={{
						position: "absolute",
						bottom: 0,
						left: "50%",
						transform: `translate(-50%, 150%)`,
					}}
				>
					<Typography
						className="forgot-p"
						display="inline-block"
						color={theme.palette.primary.main}
					>
						Forgot password?
					</Typography>
					<Typography
						component="span"
						color={theme.palette.primary.main}
						ml={theme.spacing(2)}
						sx={{ userSelect: "none" }}
						onClick={handleNavigate}
					>
						Reset password
					</Typography>
				</Box>
			</Stack>
		</>
	);
};

EmailStep.propTypes = {
	form: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default EmailStep;
